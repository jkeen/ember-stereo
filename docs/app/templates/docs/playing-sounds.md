# Playing Sounds

`findSound`, `load`, and `play` all hand back a **`Sound`**: an identity-stable container that exists before any audio has loaded.

```js
let sound = this.stereo.findSound('https://streaming.koop.org/stream.aac');
```

`findSound` is synchronous and find-or-create, so asking for the same identifier twice gives you the same `Sound`. Its identity is the url rather than the connection underneath, so it survives a connection swap or [casting](/docs/casting). References and listeners you attach to it stay valid across all of that.

Most of the time you never touch it directly. Point a template helper at a url and it finds the sound for you:

```hbs
<button {{on 'click' (toggle-play-sound @identifier)}} type='button'>
  Play/Pause
</button>
```

Helpers like [sound-is-playing](/docs/api/helpers/sound-is-playing), [sound-is-loading](/docs/api/helpers/sound-is-loading), [sound-is-loaded](/docs/api/helpers/sound-is-loaded), [sound-is-errored](/docs/api/helpers/sound-is-errored), [sound-is-seekable](/docs/api/helpers/sound-is-seekable), [sound-is-rewindable](/docs/api/helpers/sound-is-rewindable), [sound-is-fastforwardable](/docs/api/helpers/sound-is-fastforwardable), [sound-is-blocked](/docs/api/helpers/sound-is-blocked), [sound-position](/docs/api/helpers/sound-position), [sound-duration](/docs/api/helpers/sound-duration), [sound-metadata](/docs/api/helpers/sound-metadata), [sound-error-details](/docs/api/helpers/sound-error-details), and [find-sound](/docs/api/helpers/find-sound) compose into a whole player without leaving the template.

<Docs::StereoPlayerExample @identifier="/sounds/works-just-like-a-vcr.mp3" />

## Identifiers

An identifier is usually a url string, but it can also be an object with a `url` (and maybe a `mimeType`), an already loaded `Sound`, an array of any of those, or a promise resolving to any of those. Give an array when you have several versions of the same audio and want the best one that works, which is covered in [Browser Audio](/docs/browser-audio).

### On demand

This uses the same url as the player above. Sound state is app-wide, so both stay in sync.

<Docs::StereoPlayer @identifier="/sounds/works-just-like-a-vcr.mp3"/>

### Streaming

A live stream reports a duration of ∞ and disables the position controls. Here's the live web stream of the scrappy Austin community radio station, KOOP.

<Docs::StereoPlayer @identifier="https://streaming.koop.org/stream.mp3"/>

## Waiting for a sound to load

The `Sound` comes back before its audio does, so it answers its own loading state while you wait:

- **`isPending`** - exists, but no connection has resolved yet
- **`isLoading`** - a load is in flight, or the stream is buffering on play
- **`isResolved`** - a connection is backing the sound
- **`isLoaded`** - the connection has enough to play
- **`isErrored`** - every playable strategy was tried and none worked. `errors` holds the per-strategy failures and `error` the most recent one

These are reactive, so an indicator can render before the sound loads and update when something else loads or plays it.

<Docs::ProxyExample />

## Reading playback state

Once resolved, the `Sound` proxies the live state of whatever connection is backing it. The same object exposes:

- **Playback**: `isPlaying`, `isPaused`, `isBlocked`, `hasPlayed`
- **Position**: `position`, `duration`, `percentLoaded`, and for live/HLS streams `currentTime`, `startTime`, `endTime`
- **Capabilities**: `isStream`, `isSeekable`, `isRewindable`, `isFastForwardable`
- **Identity & metadata**: `url`, `mimeType`, `metadata`, `id3TagMetadata`, `connectionName`
- **Actions**: `play`, `pause`, `stop`, `togglePause`, `rewind`, `fastForward`, `seek`

Each template helper reads one of these properties off the sound it finds.

To ask whether a sound is the one for a url, call `sound.hasUrl(url)` rather than comparing `sound.url` yourself. A sound can answer to more than one url, and two urls that differ only by a query string are usually the same audio. Pass `{ exact: true }` when the query string matters, as it does for cache-busted streams.

## Volume

Volume is global, so every sound plays at the same level. It defaults to 100, which is whatever the system volume is. The `{{stereo-volume}}` modifier turns a range input into a volume control, and [toggle-stereo-mute](/docs/api/helpers/toggle-stereo-mute) handles muting.

```hbs
<input type='range' {{stereo-volume}} />
```

From the service, `stereo.volume` is a getter and setter. Mobile devices don't allow it, so [stereo-volume-is-adjustable](/docs/api/helpers/stereo-volume-is-adjustable) tells you whether to render the control at all.

## Load options

`play` and `load` take an options hash alongside the identifier:

```js
this.stereo.play(url, {
  useConnections: ['HLS', 'NativeAudio'],
  metadata: { title: 'Works Just Like A VCR' },
  startPosition: 90,
});

// or, for a live stream
this.stereo.play(streamUrl, { duration: Infinity });
```

- **`metadata`** stores whatever you want alongside the sound, and feeds the OS media controls. See [Metadata](/docs/metadata).
- **`useConnections`** limits which connections may be tried, in order of preference, instead of the full waterfall.
- **`startPosition`** (seconds) begins playback part way in. The connection is handed the offset as it's built, so the first thing it fetches is the piece you asked for.
- **`streamPauseGraceMs`** keeps a paused stream's connection open for this long before stopping it, so a listener who pauses briefly doesn't pay for a reconnect. Holding it costs bandwidth and, on a live stream, a slot on the streaming server, so the default is to stop as soon as it's paused. Pass `Infinity` to hold it until something explicitly stops it.
- **`duration`** (ms) declares how long the media is, skipping measurement rather than correcting it afterward. Pass `Infinity` for a live stream. Connections normally work this out themselves, but some cases defeat measurement.
- **`seekable`** declares if the media is seekable. Connections usually detect this on their own, but declaring it explicity takes the guesswork out.
- **`xhr`** passes `headers`, `withCredentials` and `method` through to connections that fetch over XHR.
- **`preview`** plays the sound without it becoming `currentSound`.
- **`silenceErrors`** returns the error on the result instead of throwing. Can also be set globally in `environment.js`.

## Swapping the connection

- **`sound.castUrl`** - a device-fetchable variant of the stream, used when [casting](/docs/casting). See the casting docs for why a separate url is needed.
- **`sound.swap(target)`** - replaces the backing connection while keeping the `Sound`'s identity and your references intact, carrying position and play-state across. Pass a connection key from the sound's own strategies (`sound.swap('hls')`) or a connection instance.

## Interacting with the service

You can trigger sounds directly from the `stereo` service.

<Docs::ServiceExample />
