# Events

You can monitor events on both the `stereo` service for when any sound emits an event, or on an individual sound for when that specific sound emits an event. For example,

```js
// Log when any sound starts playing
this.stereo.on('audio-played', ({ sound }) => {
  console.log(`${sound.url} started playing`);
});

let sound = this.stereo.findSound(this.url);
sound.on('audio-ended', ({ sound }) => {
  this.sendEvent('finished-listening', {
    episodeId: sound.metadata.episodeId,
  });
});

this.stereo.on('current-sound-interrupted', ({ sound }) => {
  this.sendEvent('quit-listening', {
    episodeId: sound.metadata.episodeId,
    position: sound.position,
  });
});
```

`findSound` returns immediately, so you can attach listeners before the sound has loaded.

### Example

Play around with this one and watch the events fire below. Clicking an event puts it in your javascript console.

<Docs::StereoPlayer @identifier="/sounds/internet-on-computers.mp3" />
<Docs::EventDisplay @url="/sounds/internet-on-computers.mp3" />

### Triggered on both the sound and relayed through the stereo service

- `audio-played` ({ sound }) - the sound started playing
- `audio-paused` ({ sound }) - the sound was paused
- `audio-ended` ({ sound }) - the sound finished playing
- `audio-load-error` ({ sound }) - loading sound failed
- `audio-ready` ({ sound }) - the sound is ready to play
- `audio-will-rewind` ({sound, currentPosition, newPosition}) - fired before rewinding a sound
- `audio-will-fast-forward` ({sound, currentPosition, newPosition}) - fired before fast-forwarding a sound
- `audio-position-will-change` ({sound, currentPosition, newPosition}) - fired before audio position change
- `audio-loading` ({ sound }) - the sound started loading
- `audio-blocked` ({ sound }) - the browser blocked autoplay, so user input is needed
- `audio-duration-changed` ({ sound }) - the sound's duration changed
- `audio-metadata-changed` ({ old, new, sound }) - the sound's metadata was replaced
- `audio-position-changed` ({sound}) - the playing sound's position moved. Polled about every 50ms while the page is visible, and every 250ms while it's hidden, since nothing is painting then. It fires only when the position actually changes, so a paused or stalled sound is quiet.

### Stereo service-only events

- `current-sound-changed` ({sound, previousSound}) - triggered when the current sound changes. On initial play, previousSound will be undefined.
- `current-sound-interrupted` ({sound, previousSound}) - triggered when a sound has been playing and a new one takes its place by being played, pausing the first one
- `new-load-request` ({loadPromise, urlsOrPromise, options}) - triggered whenever `.load` or `.play` is called.
- `pre-load` (urlsToTry) - triggered whenever `.load` or `.play` is called.
- `volume-change` (volume) - the service volume was set
- `playback-speed-change` (speed) - the service playback speed was set

### Casting events

These fire as casting connects and disconnects. See [Casting](/docs/casting).

- `audio-cast-availability-changed` - a cast device appeared or disappeared
- `audio-cast-connecting` - connecting to a device
- `audio-cast-connected` - audio is now playing on the device
- `audio-cast-disconnected` - playback returned to the local device
