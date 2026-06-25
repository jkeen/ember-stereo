# Advanced

A few patterns that go beyond a single play/pause button.

## Custom position controls

The `{{sound-position-slider}}` modifier turns any element into a scrubber bound to a sound's position. Point it at an identifier and it keeps the control and the playback in sync both ways — drag to seek, and it tracks as the sound plays.

<Docs::CustomPositionControl @identifier="/sounds/works-just-like-a-vcr.mp3"/>
<Docs::CustomPositionControl @identifier="/sounds/works-just-like-a-vcr.mp3" @hideSource={{true}}/>

The same modifier works without a live sound, driven by plain `@position` and `@duration` values — useful for rendering a static or server-supplied progress bar:

<Docs::ManualPositionControl @position={{10000}} @duration={{50000}} @hideSource={{false}}/>

## Building a play queue

Because `current-sound` and the `audio-ended` event are app-wide, a queue is just "play the next thing when the current one ends." Here a list of URLs plays through in order:

<Docs::Queued/>

The pattern: keep your own ordered list, `play` the first item, and subscribe to `audio-ended` on the service to advance. See [Monitoring Events](/docs/event-monitoring) for the full event list.

## Working with the Sound directly

For anything more involved than the helpers cover, reach for the `Sound` object itself — its lifecycle states, playback proxying, and connection swaps are documented in [The Sound Object](/docs/waiting-for-sounds).

<Docs::ProxyExample />
