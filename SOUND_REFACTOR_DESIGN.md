# ember-stereo Sound Refactor — Design

Status: **reviewed — needs a focused second pass before migration** (see "Review findings" at the bottom). Goal is to converge four threads into one architecture:

- `feature/sound-refactor` branch — the `Sound`-wraps-connection proxy (the foundation).
- `casting` / `airplay` branches — the public casting API + Remote Playback wiring.
- the AirPlay pilot (`airplay-sound-bridge`) — the native-element route mechanism + device-proven clock logic.
- the standing `sound-proxy.js` FIX ME — eliminate SoundProxy / unblock ember-concurrency 5.

## Guiding principle

Put the thin generic layer **on top of** the rich specific layer. `Sound` is a lazy proxy that owns identity + strategy + failover + the connection swap, and **delegates** all playback behavior to a concrete connection (a `BaseSound` subclass). Connections are the backends; nothing in them gets reimplemented. The refactor is **additive** (a new layer over intact connections), not substitutive.

## Decisions (locked)

1. **Swap concurrency = latest-wins.** A new swap supersedes an in-flight one (it carries the same handoff intent).
2. **Casting = a global outlet, NOT a strategy.** The service owns one persistent cast outlet and routes the current Sound through it via an imperative swap. Strategies stay local-only; no contextual `canPlay`.
3. **Short gap, no overlap.** A swap stops A then starts B. No crossfade, no two-live-pipelines. (Every real scenario already has a gap or has nothing playing; gapless quality-switching isn't a feature.)
4. **URL = Sound (immutable identity).** A different URL is a different Sound. A Live-Rewind re-point = a new Sound, not a mutation. The route survives airing switches because it lives on the service outlet element, not the Sound.
5. **`oneAtATime` overlap conflict = moot** (follows from #3 — no overlap).

## Today (what exists)

- A sound **is** a connection: `NativeAudio`/`Hls`/`Howler extends BaseSound`. The service's strategizer picks and instantiates one per URL.
- `SoundProxy` (`-private/utils/sound-proxy.js`): an identity-stable handle returned by `findSound(url)` that exists *before* the connection loads. Tracks `isLoading` by relaying the service's `loadTask:*`/`playTask:*` events; sets `.value` once `findLoadedSound` resolves. Cached in `proxyCache`.
- Service-level bookkeeping that exists **only because connections are disparate/transient**: `errorCache` (errors keyed by url+connection), cross-connection failure tracking, `proxyCache`.
- `feature/sound-refactor`'s `Sound` (`-private/utils/sound.js`): already a proxy — eager, cached, `oneAtATime`-registered, runs its own `loadTask`/strategizer, stores `strategies`/`failures`, relays connection events via `EVENT_MAP`, proxies all methods/state to `.value`, owns `volume`/`metadata`/autoplay-blocking. Incomplete: debug logging, parallel-strategy path commented out, empty "emits all events" test, `isLoading`/etc. proxy to `.value` (undefined pre-resolution), service integration partial.

## Target architecture

### `Sound` (the proxy) owns
- **Identity**: `identifier`/`url`, resolved/normalized eagerly. Created eagerly, cached by identifier in `soundCache`, registered with `oneAtATime`.
- **Lifecycle state of its own** (for the pre-resolution window): `isPending` (no connection yet), `isLoading` (its `loadTask` running OR the resolved connection loading), `isResolved` (`.value` set), `isErrored` (all strategies tried and failed). See "Lifecycle state ownership".
- **Strategy**: the ordered strategy list + per-strategy state (`canPlay`, `tried`, `success`, `error`). Two selection modes: auto-advance (try in order) and pinned (force a specific connection — casting).
- **The swap**: replace `.value` with a different connection, transferring state and managing events. Drives failover, fallback, and casting through one mechanism.
- **Cross-cutting state**: `volume`, playback rate, `metadata`, autoplay-block handling.
- **Event relay**: re-emit the active connection's `audio-*` events as its own (already via `EVENT_MAP`), with swap-aware suppression.

### Connection (the backend) contract
Existing `BaseSound` interface plus:
- `canPlay(context)` — allowed to be **contextual**, not just mime/platform. The AirPlay connection's `canPlay` = "a remote route is available and the URL is natively castable."
- **`detach()` vs `teardown()`** — the one place backend-specifics legitimately surface at the swap boundary:
  - `NativeAudio.detach()` — release the shared audio element back to the pool, keep nothing.
  - `Howler.detach()` — free Web Audio nodes.
  - `AirPlay.detach()` — **do NOT destroy the element**; the persistent `<audio>` *is* the route. Detach state only.
  - `teardown()` stays as the full destroy (Sound destroyed / cache eviction).
- Connections keep owning their own clock, loading/ready/error/retry, `percentLoaded`, blocked/autoplay, HLS live-edge (`currentTime`/`startTime`/`endTime`/programDateTime), Howler's no-element model, `sharedAudioAccess` (iOS unlock).

### Service owns (only what's genuinely cross-sound)
- `oneAtATime` (only one sound plays).
- `soundCache` (one `Sound` per identifier — replaces `proxyCache`; `errorCache` deleted).
- **Cast mode**: `isCasting`/`castDeviceName`/availability (Remote Playback API + webkit fallback). While on, it (a) biases every new `Sound`'s strategy toward the AirPlay connection and (b) provides the shared singleton route element the AirPlay connection uses.
- The public casting API from the `casting` branch: `{{cast-button}}`, `{{is-casting}}`, `{{casting-available}}`, `showCastMenu`/`startCasting`/`stopCasting`, `audio-cast-connected/connecting/disconnected` + `audio-*-availability-changed` events, device name from the `remote` connect event.

## Lifecycle state ownership (the SoundProxy replacement)

`findSound(url)` returns the `Sound` (find-or-create in `soundCache`). It must answer loading/pending/errored **before** a connection exists:

| State | Source while pending (no `.value`) | Source once resolved (`.value` set) |
|---|---|---|
| `isPending` | `true` (no value) | `false` |
| `isLoading` | `loadTask.isRunning` | `value.isLoading` (e.g. stream buffering on play) |
| `isErrored` | all strategies `tried` and none `success` | `value.isErrored` OR strategies exhausted |
| `isResolved` | `false` | `true` |
| `errors` | `this.failures` (per-strategy) | `this.failures` + `value.error` |

This deletes SoundProxy, `proxyCache`, and `errorCache`, and removes the `waitForProperty` / evented-task usage that blocks ember-concurrency 5.

Edge: the spinner today also reflects **play-time** loading (a stream buffering when play is pressed), which SoundProxy got from `playTask:*` events. In the new model `isLoading` must OR the Sound's `loadTask` with the resolved connection's `isLoading`.

## The swap

A swap moves the Sound from connection A to connection B while the Sound identity and all external references stay put. **One mechanism** serves failover, fallback, and casting. Policy follows the locked decisions: latest-wins, short-gap, source-identity event arbitration.

**Event arbitration by source identity** (not a global flag): the Sound relays only `this.value`'s events. On swap, A's relays are *unregistered* (using the stored bound-handler refs — fixing the current bind-mismatch leak), so A's teardown `pause`/`ended` simply never reach the Sound. No `_swapping` boolean that would also blind the Sound to real end/pause/user input.

`swapTask` ({ restartable } ⇒ latest-wins; a canceled run tears down its half-built B in `finally`):
```
gen = ++this._swapGen
handoff = this._handoff ?? capture { position, isPlaying, volume, rate } from this.value
this._handoff = handoff                  // survives supersession so intent isn't lost
unregisterRelays(this.value)             // arbitration: former events stop reaching the Sound
this.value?.detach()                     // detach, not teardown — AirPlay keeps its element
this.value = null                        // short gap; isLoading is Sound-owned here
B = target (explicit connection for cast, else the local strategy waterfall)
for strategy in [B, ...fallbacks]:
  try { yield strategy.load() } catch { continue }   // failover: try next on failure
  B = strategy; break
else: → errored                          // all exhausted
if gen !== this._swapGen: B.teardown(); return       // a newer swap superseded us
B.seek(handoff.position); B.volume = handoff.volume; B.rate = handoff.rate
registerRelays(B); this.value = B
if handoff.isPlaying: yield B.play()
this._handoff = null
```

Invariants / edges resolved by the decisions:
- **No A+B overlap** (short-gap) ⇒ the `oneAtATime` conflict disappears.
- **Losing A is safe**: identity is the URL, so the ultimate fallback is always "rebuild a local connection from the URL at `handoff.position`." Detaching A (even a healthy local A on cast-engage) is never catastrophic.
- **Cancel cleanup**: a superseded/canceled swap must `teardown` its half-built B (`try/finally`), or the orphaned element/HLS instance leaks.
- **Task coordination**: cancel `handlePlayFailingTask` for A on swap and restart it for B, or success/error lands on the wrong strategy.
- **`detach` vs `teardown`** per connection: `NativeAudio` releases the shared element; `Hls` must `hls.destroy()`; `Howler` `unload()`; **AirPlay detaches but keeps the (service-owned) element**.

Still open: **live/stream position handoff** (programDateTime), and the **mid-stream-stall detection** that would *trigger* failover (scenario "A drops") — `BaseSound` has no "playing stream stalled" signal today.

## Casting = a global outlet (not a strategy)

Casting is a **global output mode**, not a per-Sound connection choice. The service owns one persistent **cast outlet** (the route holder) and routes whatever Sound is current through it.

- **Service-owned singleton outlet**: one persistent `<audio>` element + the Remote Playback route + cast state (`isCasting`/`castDeviceName`/availability). It outlives every Sound — Sounds churn per airing (URL=Sound), the outlet does not. This is the corrected ownership: the element is **not** created per connection (the pilot's bug).
- **Engage**: user taps cast → the service issues an imperative `swap` of the **current** Sound onto the AirPlay connection. The AirPlay connection **borrows** the service's outlet element; it never creates one. No strategy, no `canPlay`.
- **Airing switch while casting**: new URL → new Sound → the service routes it through the same outlet (swap the new current Sound to AirPlay). The route survives because the **element** survives, independent of Sound lifecycle.
- **Disengage** (device disconnect OR in-app stop): the service swaps the current Sound back to a local connection at `handoff.position`; the outlet element persists, idle. (Covers the AirPlay→local involuntary-disconnect case the first draft omitted.)
- **AirPlay connection mechanism** (from the pilot, contained inside the connection): native `src` (MSE/HLS can't cast), dead-reckon clock (Safari freezes `currentTime` while AirPlaying), seek-settle window, guarded `ended`, `<audio>` not `<video>`.
- **Public API** (from the `casting` branch): `{{cast-button}}`, `{{is-casting}}`, `{{casting-available}}`, `showCastMenu`/`startCasting`/`stopCasting`, `audio-cast-connected/connecting/disconnected` + `audio-*-availability-changed` events; device name from the Remote Playback `connect` event; webkit `webkitShowPlaybackTargetPicker` as fallback.

## What gets deleted

- `SoundProxy` + `proxyCache`.
- `errorCache` (errors live on the Sound's strategies/failures).
- Cross-connection failure tracking in the service.
- The bespoke app-level `remote-playback` service (its policy moves into the service cast mode + the AirPlay connection).
- `waitForProperty` / evented-task dependence (unblocks ember-concurrency 5).

## Migration (incremental, on the now-working test-app net)

1. Land `feature/sound-refactor`'s `Sound` as the cached entity behind `findSound` (returns Sound, not SoundProxy). **Net-new code** (the branch proxies these to `.value`): Sound-owned `isPending`/`isLoading`/`isErrored` for the pre-resolution window; correct event-relay register/unregister (stored handler refs); retry-reset; add `currentTime`/`startTime`/`endTime`/`id3TagMetadata` to the proxy surface. Keep connections as-is. Green the existing suite (+ a real event-relay test).
2. Implement `swapTask` (latest-wins, short-gap, source-identity arbitration, cancel-cleanup, task coordination) + the `detach`/`teardown` contract on the three connections (HLS `hls.destroy()`, Howler `unload()`); add fallback + mid-playback failover; tests.
3. Delete SoundProxy/`proxyCache`/`errorCache`; route helpers to the Sound (preserve `cachedErrors` shape or update readers); green.
4. Add the AirPlay connection (pilot mechanism) that **borrows a service-owned singleton outlet element**.
5. Add the **global cast outlet** to the service + the `casting` branch public API (engage/airing-switch/disengage as imperative swaps); collapse the `feed.js` `isRemote` transport fork to plain `sound.*`.
6. ember-concurrency 5 upgrade (now that `waitForProperty`/evented-tasks are gone).

## Review findings — gaps to close before migration

A completeness review surfaced these. Grouped into clear corrections (bake in) and decisions (need a call).

### Clear corrections (no decision needed)
- **The foundation `Sound`'s getters contradict the lifecycle table.** `isErrored`/`isLoading` proxy to `value?.x` → `undefined`/`false` while pending. Step 1 is net-new code (own these while pending), not "just land the branch."
- **`@cached` `canPlay` + once-built strategies** mean contextual (casting) `canPlay` never re-evaluates. Needs a rebuild trigger — or cast doesn't go through strategy at all (see decisions).
- **`_swapping` global flag is the wrong primitive** — suppress terminal events by **source identity** (ignore events from the outgoing connection instance after the reference flips), not a time window that also blinds the Sound to real end/pause/user input.
- **HLS `detach` must `hls.destroy()`** (MSE leak per airing switch); Howler needs `unload()`. The contract omitted HLS — the primary archive backend.
- **Singleton AirPlay route element must be service-owned**, not created per connection (the pilot creates one per adapter → two elements both claiming the route). AirPlay connection *borrows* it, like `sharedAudioAccess`.
- **Proxy surface is missing `currentTime`/`startTime`/`endTime`/`id3TagMetadata`** (HLS live-edge), which `playback-feed`/`bucket-items`/track helpers read; and `id3TagsMetadata` is a typo'd getter mismatching `BaseSound.id3TagMetadata`.
- **Retry is a dead no-op** — `tried` flags never reset, so re-`play()`ing an errored Sound does nothing. Define explicit retry-reset.
- **`waitForProperty`/evented tasks are still in the foundation `Sound`** (`handlePlayFailingTask`/`waitForPlaySuccessTask`) — ember-concurrency 5 is NOT unblocked by step 1; it's its own step.
- **Listener-leak bug to fix**: `_unregisterEventRelays` and `cast-button` `off()` use freshly-`.bind()`ed handlers that never match `on()` — relays never removed. The "emits all events" test is an empty body; the relay contract is untested.
- **SSR/Fastboot**: eager Sound creation + service building a media element at construction touch `document` at field-init → guard.
- **Autoplay-block handling is duplicated** (Sound `handleAudioBlocking` vs service `_attemptToPlaySound`) — delete one.
- **`cachedErrors` shape** is consumed across the proxy boundary; the Sound's `failures` must preserve the shape (or all readers updated). `proxyCache` is untracked on purpose (anti-thrash) — folding into tracked `soundCache` risks render churn.
- **Task coordination**: a swap must cancel `handlePlayFailingTask` for A (else it writes success/error onto the wrong strategy after the reference flips).

### Decisions needed (genuine forks)
1. **Swap concurrency policy**: drop (ignore new swap until current finishes), restart (cancel in-flight, latest wins), or queue? Rapid airing switches (Live Rewind) argue latest-wins; a half-stood-up AirPlay element argues drop. Pick one; it defines the swap task.
2. **Casting selection model**: cast as a *strategy* (needs the `canPlay` rebuild trigger) vs. cast as an *always-explicit swap* (strategy never involved → `@cached` `canPlay` is moot, simpler). Leaning explicit-swap.
3. **Gapless overlap**: do scenarios 2 (mid-play failover) and 4 (quality switch) need true no-gap crossfade (both connections briefly live), or is a short gap acceptable? "No overlap needed" deletes the `oneAtATime` conflict and a lot of complexity.
4. **Live Rewind URL re-point**: is re-pointing a feed's URL a swap, a new Sound, or a mutation of an existing Sound's identity? Defines the identity model.
5. **`oneAtATime` during overlap**: only relevant if (3) wants overlap — then swap must deregister A from `oneAtATime` before B plays (its `pauseAll` keys off `audio-played` + differing url and would kill the overlap).

### Still-open (smaller)
- Live/stream position handoff across a swap (programDateTime) — the riskiest edge, and it coincides with casting (mostly live).
- Disconnect-on-device vs disconnect-in-app: AirPlay→local swap-back on involuntary route drop isn't modeled.
- Mid-stream stall detection as the trigger for failover (scenario 2) — `BaseSound` has no "playing stream stalled" signal today.
- Cached pending Sound (never played) eviction/GC.
