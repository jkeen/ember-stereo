# Events

You can monitor events on both the `stereo` service for when any sound emits an event, or on an individual sound for when that specific sound emits an event. For example

```js

  // Log when any sound starts playing
  this.stereo.on('audio-played', ({sound}) => {
    console.log(`${sound.url} started playing`)
  })

  sound.on('audio-ended', ({sound}) => {
    console.log(`${sound.url} finished playing`)
  })
```

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
- `pre-load` ({loadPromise, urlsOrPromise, options}) - triggered whenever `.load` or `.play` is called.
