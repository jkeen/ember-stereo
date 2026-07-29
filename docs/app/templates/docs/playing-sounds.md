# Playing Sounds

`ember-stereo` operates on sounds by providing its helpers an <em>identifier</em>. Usually this is just a URL string, but an identifier could also be an object with a `url` (and maybe a `mimeType` property), an already loaded `Sound`, an array of any of the previous items, or even a promise that resolves to any of the previous. Whatever the case, you're covered.

```hbs
<button {{on 'click' (toggle-play-sound @identifier)}} type='button'>
  Play/Pause
</button>
```

Template helpers like like [sound-is-playing](/docs/api/helpers/sound-is-playing), [sound-is-loading](/docs/api/helpers/sound-is-loading), [sound-is-loaded](/docs/api/helpers/sound-is-loaded), [sound-is-errored](/docs/api/helpers/sound-is-errored), [sound-is-seekable](/docs/api/helpers/sound-is-seekable), [sound-is-rewindable](/docs/api/helpers/sound-is-rewindable), [sound-is-fastforwardable](/docs/api/helpers/sound-is-fastforwardable), [sound-is-blocked](/docs/api/helpers/sound-is-blocked), [sound-position](/docs/api/helpers/sound-position), [sound-duration](/docs/api/helpers/sound-duration), [sound-metadata](/docs/api/helpers/sound-metadata), [sound-error-details](/docs/api/helpers/sound-error-details), and [find-sound](/docs/api/helpers/find-sound) can be quickly composed to build a simple player completely in the template.

<Docs::StereoPlayerExample @identifier="/sounds/works-just-like-a-vcr.mp3" />

### On Demand URL

This is using the same url as the player example above. Sound status is app-wide and stays in sync.

<Docs::StereoPlayer @identifier="/sounds/works-just-like-a-vcr.mp3"/>

### Streaming URL

When loading a streaming URL, the duration is ∞ and the position-related controls are disabled. Here's the live web stream of the scrappy Austin community radio station, KOOP

<Docs::StereoPlayer @identifier="https://streaming.koop.org/stream.mp3"/>

## Load options

`play` and `load` take an options hash alongside the identifier:

```js
this.stereo.play(url, {
  useConnections: ['HLS', 'NativeAudio'],
  metadata: { title: 'Works Just Like A VCR' },
  startPosition: 90,
});
```

- **`metadata`** stores whatever you want alongside the sound, and feeds the OS media controls. See [Metadata](/docs/metadata).
- **`useConnections`** limits which connections may be tried, in order of preference, instead of the full waterfall.
- **`startPosition`** (seconds) begins playback part way in. The connection is handed the offset as it's built, so the first thing it fetches is the piece you asked for. Seeking after load would throw away the buffer it just filled and fetch it again.
- **`streamPauseGraceMs`** keeps a paused stream's connection open for this long before stopping it, so a listener who pauses briefly doesn't pay for a reconnect. Holding it costs bandwidth and, on a live stream, a slot on the streaming server, so the default is to stop as soon as it's paused. Pass `Infinity` to hold it until something explicitly stops it.
- **`duration`** (ms) declares how long the media is, skipping measurement rather than correcting it afterward. Pass `Infinity` for a live stream. Connections normally work this out themselves, but some cases defeat measurement: a relay carrying an endless broadcast reports a duration that grows in real time from a window starting at zero, which is exactly what a recording still being written looks like. Declaring `Infinity` there is what disconnects a paused sound rather than holding it at a position it can't return to, and what cache-busts the URL on resume so a resumed stream doesn't interleave stale audio. It does not affect seekability, which connections measure separately.
- **`xhr`** passes `headers`, `withCredentials` and `method` through to connections that fetch over XHR.

## Interacting with the service

You might need to trigger a sound from javascript land by talking directly to the `stereo` service. It's cool, back in the ember-hifi days this is how we _had_ to play sounds… and _we liked it!_

<Docs::ServiceExample />
