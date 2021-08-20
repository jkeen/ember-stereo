# Events

You can monitor events on both the `stereo` service for when any sound emits an event, or on an individual sound for when that specific sound emits an event. For example,

```js
// Log when any sound starts playing
this.stereo.on('audio-played', ({ sound }) => {
  console.log(`${sound.url} started playing`);
});

let sound = await this.stereo.findSound(this.url);
if (sound) {
  // sound is loaded
  sound.on('audio-ended', ({ sound }) => {
    this.sendEvent('finished-listening', {
      episodeId: sound.metadata.episodeId,
    });
  });
}

this.stereo.on('current-sound-interrupted', ({ sound }) => {
  this.sendEvent('quit-listening', {
    episodeId: sound.metadata.episodeId,
    position: sound.position,
  });
});
```

### Example

Here's a long audio file, play around with it and see the events that are triggered below. Clicking on the event will put it in your javascript console.

{{docs/stereo-player identifier="/sounds/foghorn-leghorn.m4a"}}

{{docs/event-display url="/sounds/foghorn-leghorn.m4a"}}

### Triggered on both the sound and relayed through the stereo service

- `audio-played` ({ sound }) - the sound started playing
- `audio-paused` ({ sound }) - the sound was paused
- `audio-ended` ({ sound }) - the sound finished playing
- `audio-load-error` ({ sound }) - loading sound failed
- `audio-ready` ({ sound }) - the sound is ready to play
- `audio-will-rewind` ({sound, currentPosition, newPosition}) - fired before rewinding a sound
- `audio-will-fast-forward` ({sound, currentPosition, newPosition}) - fired before fast-forwarding a sound
- `audio-position-will-change` ({sound, currentPosition, newPosition}) - fired before audio position change
- `audio-position-changed` ({sound})

### Stereo service-only events

- `current-sound-changed` ({sound, previousSound}) - triggered when the current sound changes. On initial play, previousSound will be undefined.
- `current-sound-interrupted` ({sound, previousSound}) - triggered when a sound has been playing and a new one takes its place by being played, pausing the first one
- `new-load-request` ({loadPromise, urlsOrPromise, options}) - triggered whenever `.load` or `.play` is called.
- `pre-load` (urlsToTry) - triggered whenever `.load` or `.play` is called.
