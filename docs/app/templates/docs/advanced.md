# Advanced

A few patterns that go beyond a single play/pause button.

## Custom position controls

The `{{sound-position-slider}}` modifier turns any element into a scrubber bound to a sound's position. Point it at an identifier and it keeps the control and the playback in sync both ways. Drag to seek, and it tracks as the sound plays.

<Docs::CustomPositionControl @identifier="/sounds/works-just-like-a-vcr.mp3"/>
<Docs::CustomPositionControl @identifier="/sounds/works-just-like-a-vcr.mp3" @hideSource={{true}}/>

The same modifier works without a live sound, driven by plain `@position` and `@duration` values. This is useful for rendering a static or server-supplied progress bar:

<Docs::ManualPositionControl @position={{10000}} @duration={{50000}} @hideSource={{false}}/>

For a read-only bar, `{{sound-position-progress}}` sizes an element to the sound's position instead. It takes the same `@position` and `@duration` fallbacks.

```hbs
<div {{sound-position-progress @identifier}}></div>
```

## Building a play queue

Because `current-sound` and the `audio-ended` event are app-wide, a queue is just "play the next thing when the current one ends." Here a list of URLs plays through in order:

<Docs::Queued/>

The pattern: keep your own ordered list, `play` the first item, and subscribe to `audio-ended` on the service to advance. See [Monitoring Events](/docs/event-monitoring) for the full event list.

## Prewarming a connection

`Howler` and `HLS` pull their library down as a lazy chunk, and `Chromecast` fetches the Cast SDK from `gstatic.com`. Whichever sound needs one first pays for that download before any audio is fetched, so if you know which is coming, warm it up first:

```js
// e.g. a live stream that can rewind into a recorded HLS archive
this.stereo.prewarmConnection('HLS');
```

It takes the name a connection is registered under and resolves once it's warm. Connections with nothing to download resolve immediately. [Your own connections](https://github.com/jkeen/ember-stereo/blob/main/ember-stereo/CUSTOM_CONNECTIONS.md) become prewarmable by implementing `static preload()`.

## Working with the Sound directly

For anything more involved than the helpers cover, reach for the `Sound` object itself. Its lifecycle states, playback proxying, and connection swaps are documented in [Playing Sounds](/docs/playing-sounds).

<Docs::ProxyExample />
