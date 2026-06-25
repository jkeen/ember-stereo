# Upgrading

## Upgrading to 6.0

6.0 inverts the core model. `findSound` now returns an identity-stable **`Sound` proxy** (see [The Sound Object](/docs/waiting-for-sounds)) instead of a transient connection, and casting (AirPlay + Chromecast) is built into the addon. If you were on a 5.x beta, here's everything to change.

### 1. `findSound` is synchronous and always returns a `Sound`

It find-or-creates and returns immediately, so drop any `await` in front of it. The returned `Sound` may still be pending, so replace "is there a sound yet?" presence checks with `isResolved` (a backend has resolved) or `isLoaded` (it's ready to play):

```js
// BEFORE — undefined until the audio loaded
if (this.stereo.findSound(url)) { /* … */ }

// AFTER — the proxy always exists; check whether a backend resolved
if (this.stereo.findSound(url)?.isResolved) { /* … */ }
```

`findSound` (the identity-stable proxy) is now distinct from `findLoadedSound` (the underlying loaded connection, or `undefined`). Prefer the proxy — it survives connection swaps, so references and listeners you attach to it stay valid.

### 2. Match sounds by `hasUrl`, not `url ===`

A resolved `Sound` reports its backend's *normalized* URL, which won't `===` the raw identifier you handed in. Anywhere you compared event payloads against an identifier, switch to `hasUrl`:

```js
// BEFORE
this.stereo.on('audio-loaded', ({ sound }) => {
  if (sound.url === this.identifier) { this.attach(sound); }
});

// AFTER
this.stereo.on('audio-loaded', ({ sound }) => {
  if (sound.hasUrl?.(this.identifier)) { this.attach(sound); }
});
```

### 3. Read playback state straight off the `Sound` — no transport fork

If you hand-rolled a "local vs. remote" branch to support AirPlay/casting — separate `position`/`duration`/`isPlaying` getters, a custom seek path — delete it. In 6.0 the single `Sound` reports the remote device's clock while casting, so the same calls work whether playback is local or cast:

```js
// BEFORE
get position()  { return this.isRemote ? this.remote.position : this.sound?.position; }
seek(ms)        { this.isRemote ? this.remote.seek(ms) : (this.sound.position = ms); }

// AFTER
get position()  { return this.sound?.position; }
seek(ms)        { if (this.sound) { this.sound.position = ms; } }
```

### 4. Delete any app-level remote-playback service

Casting policy now lives inside the addon, so a bespoke service that tracked the route, mirrored position, and toggled play is no longer needed. Drive the UI off the `stereo` service instead:

- `{{cast-button}}`, `{{is-casting}}`, `{{casting-available}}` in templates
- `stereo.showCastMenu(identifier)`, `stereo.stopCasting()`, `stereo.prewarmCast(identifier)`
- `stereo.isCasting`, `stereo.isCastingAvailable`, `stereo.castDeviceName`, `stereo.castIconName`

See [Casting](/docs/casting) for the full surface. There's nothing to register — the casting connections wire themselves up.

### 5. Give the device a fetchable URL via `sound.castUrl`

A cast device fetches the audio itself, so it needs a public or signed variant of the stream:

```js
let sound = this.stereo.findSound(identifier);
sound.castUrl = publicStreamUrl;
```

For an authenticated stream where you can't know the cast URL until load time, pass it through as a load option (`castUrl`, plus `castStartTime` for live streams) so it's in place before the device connects:

```js
this.stereo.loadTask.perform(url, { metadata, castUrl, castStartTime });
```

### 6. Guard for a `null` currentSound

`stereo.currentSound` can now clear to `null` (for example when casting disengages), so null-check it in your `current-sound-changed` handlers:

```js
this.stereo.on('current-sound-changed', ({ sound }) => {
  if (!sound) { return; }
  // …
});
```

### 7. Trust the proxy as the source of truth

If you used to pull `sound` out of a `loadTask`/`playTask` result and stash it, just read `this.stereo.currentSound` (or the `Sound` from `findSound`) — the stable proxy is authoritative and updates reactively.

---

## Upgrading from Hifi

If you're coming from [ember-hifi](http://github.com/nypublicradio/ember-hifi), welcome!

### Why upgrade?

1. Handy template helpers make things ridiculously simpler!
2. Stereo uses [ember-concurrency](http://ember-concurrency.com) tasks instead of the home rolled mixture of rat-nested promises I devised back in 2015 when that sort of thing was in vogue. If you're using `ember-concurrency` tasks in your app you can change your `play` and `load` calls to use the task versions, at `this.stereo.playTask` and `this.stereo.loadTask`
3. Improved tooling to help deal with autoplay problems. An `audio-blocked` event was added, as well as an `autoplay-allowed` helper and a `sound-is-blocked` helper to help deal with autoplay issues. ([fixes hifi issue #44](https://github.com/nypublicradio/ember-hifi/issues/44))
4. Better defaults. Volume is now by default at 100, aka system volume. You can set `initialVolume: 50` in the environment configuration if you want to keep it at its former level.
5. Better docs, better tests, better future! ([fixes hifi issue #25](https://github.com/nypublicradio/ember-hifi/issues/25))

### Upgrade your existing app

1. Find anything that says "hifi", "ember-hifi", or "emberHifi" and rename it "stereo", "ember-stereo", or "emberStereo", respectively. The hifi service is probably the one you'll have the most of, and maybe your environment config.
2. Any event handlers that were expecting `(sound)` should now have a new signature and need to be changed to `({sound})`
   e.g.

```js
//BEFORE
this.hifi.on('event-name', (sound) => {
  /* handler */
});

//AFTER
this.stereo.on('event-name', ({ sound }) => {
  /* handler */
});
```

3. Whatever tricks you had implement to do in order to catch that uncatchable 'All Promises Failed' error in `hifi` you can remove them. `play` and `load` requests will now fail sanely. And if you don't want them to throw errors at all, instead returning the error as part of the response, you can pass `silenceErrors: true` as an option. (fixes hifi issue [#86](https://github.com/nypublicradio/ember-hifi/issues/86) and [#16](https://github.com/nypublicradio/ember-hifi/issues/16))
4. `this.stereo.connections` has been renamed to `this.stereo.connectionNames`. `this.stereo.connections` now returns the actual connection objects.
