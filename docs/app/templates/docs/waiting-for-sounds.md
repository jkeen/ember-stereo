# The Sound Object

When you call `findSound`, `load`, or `play`, what you get back is a **`Sound`** — a lazy, identity-stable proxy. It exists the moment you ask for it, *before* any audio has loaded, and it sticks around for as long as the sound is cached.

```js
let sound = this.stereo.findSound('https://streaming.koop.org/stream.aac');
```

`findSound` is synchronous and find-or-create: ask for the same identifier twice and you get the same `Sound` back. Because the identity is the URL — not the underlying connection — the same object survives a connection swap (failover, a quality change, or [casting](/docs/casting)). Hold onto it, render off it, attach event listeners to it, and it stays valid.

## Waiting for a sound to load

Since the `Sound` comes back before its audio does, it answers its own loading state while you wait. The proxy owns this lifecycle even when no connection exists yet:

| State | Meaning |
| --- | --- |
| `isPending` | The `Sound` exists but no connection has resolved yet. |
| `isLoading` | A load is in flight (or the resolved stream is buffering on play). |
| `isResolved` | A connection resolved and is backing the sound. |
| `isLoaded` | The backend has enough to play. |
| `isErrored` | Every playable strategy was tried and none succeeded. |
| `errors` / `error` | The per-strategy failures, and the most recent error. |

These are reactive, so you can render straight off them — and because `findSound` hands back the same identity-stable `Sound` no matter who asks first, an indicator can render *before* anything loads the sound and still update when a load or play happens somewhere else entirely. The demo below splits those roles: the left panel only watches, the right panel only acts, and neither knows about the other.

<Docs::ProxyExample />

## Reading playback state

Once resolved, the `Sound` proxies the live state of whatever connection is backing it. The same object exposes:

- **Playback**: `isPlaying`, `isPaused`, `isBlocked`, `hasPlayed`
- **Position**: `position`, `duration`, `percentLoaded`, and — for live/HLS streams — `currentTime`, `startTime`, `endTime`
- **Capabilities**: `isStream`, `isSeekable`, `isRewindable`, `isFastForwardable`
- **Identity & metadata**: `url`, `mimeType`, `metadata`, `id3TagMetadata`, `connectionName`

…and the action methods you'd expect: `play`, `pause`, `stop`, `togglePause`, `rewind`, `fastForward`, `seek`.

The template helpers (`sound-is-playing`, `sound-position`, and friends) are thin wrappers over exactly these properties, so anything you can do in a template you can do off a `Sound` in JavaScript.

## `castUrl` and `swap`

Two pieces of the proxy come up when you start moving a sound between backends:

- **`sound.castUrl`** — a device-fetchable variant of the stream, used when [casting](/docs/casting). See the casting docs for why a separate URL is needed.
- **`sound.swap(target)`** — replaces the backing connection while keeping the `Sound`'s identity and all your references intact, carrying position and play-state across. Pass a connection key from the sound's own strategies — `sound.swap('hls')` — or a connection instance. Swaps are latest-wins: performing a new one aborts the one in flight, and a failed swap records its error and re-resolves a working backend. This is the same mechanism behind failover and casting, and it's why `currentSound` never changes out from under you when the backend does.
