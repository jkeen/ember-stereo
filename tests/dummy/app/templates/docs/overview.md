# What's in the box

A high level overview of what's in this addon

### Service

The `stereo` service manages loading and playing sounds, making sure that only one sound plays at at time, setting volume, and providing system-level events your application can tie into.

### Template Action Helpers

These are the helpers that start with a verb, and you'll use them to perform an action on a sound/url.

[`load-sound`](/docs/api/helpers/load-sound), [`play-sound`](/docs/api/helpers/play-sound), [`toggle-play-sound`](/docs/api/helpers/toggle-play-sound), [`seek-sound`](/docs/api/helpers/seek-sound), [`rewind-sound`](/docs/api/helpers/rewind-sound), [`fastforward-sound`](/docs/api/helpers/fastforward-sound), and [`stop-sound`](/docs/api/helpers/stop-sound) are all basically used like this:

<Docs::PlayButtonNoStatus @identifier="/sounds/tic-tac-toe.mp3" />

### Template Helpers

These are the helpers that generally start with `sound`, and you'll use them to get information about a sound/url.

[`sound-is-playing`](/docs/api/helpers/sound-is-playing), [`sound-is-loading`](/docs/api/helpers/sound-is-loading), [`sound-is-loaded`](/docs/api/helpers/sound-is-loaded), [`sound-is-errored`](/docs/api/helpers/sound-is-errored), [`sound-is-seekable`](/docs/api/helpers/sound-is-seekable), [`sound-is-rewindable`](/docs/api/helpers/sound-is-rewindable), [`sound-is-fastforwardable`](/docs/api/helpers/sound-is-fastforwardable), [`sound-is-blocked`](/docs/api/helpers/sound-is-blocked), [`sound-position`](/docs/api/helpers/sound-position), [`sound-duration`](/docs/api/helpers/sound-duration), [`sound-metadata`](/docs/api/helpers/sound-metadata), [`sound-error-details`](/docs/api/helpers/sound-error-details), and [`find-sound`](/docs/api/helpers/find-sound) can be quickly composed control audio playback right in the template.

[`find-sound`](/docs/api/helpers/find-sound) returns a loaded sound object given an identifier, and [`current-sound`](/docs/api/helpers/current-sound) returns the currently playing/paused sound. [`stereo-volume`](/docs/api/helpers/stereo-volume) returns the current system audio level.

All these helpers take an identifier as an argument which can be a `url` string, an object with a `url` property, a loaded sound object, or even a promise that resolves to one of the previous items.

<Docs::PlayButtonWithStatus @identifier="/sounds/tic-tac-toe.mp3" />

### Modifiers

There are a couple of modifiers to help in creating a volume and a position control. [`{{stereo-volume}}`](/docs/api/helpers/stereo-volume) can transform a range control into a volume control, and [`{{sound-position-slider}}`](/docs/api/helpers/sound-position-slider) can turn an element into a position control.

## Stereo Connections

Stereo `connections` are plugins for `ember-stereo` that know how to load particular sound formats. Different devices have different audio capabilities, so given a url the `stereo` service will try each loaded connection until one succeeds. Generally, stereo always tries playing the sound using a native audio element before trying anything else.

- `NativeAudio`: uses the native `<audio>` element to play sounds. This is prioritized automatically on mobile devices and can play any format the user's browser supports.
- `Howler`: uses [howler.js](https://github.com/goldfire/howler.js) to play sounds.
- `HLS` uses [HLS.js](https://github.com/video-dev/hls.js/) to play [.hls streams](https://caniuse.com/http-live-streaming).

Stereo offers three connection options, but only the native audio connection is included by default (to keep bundle size small). To include other audio connections, add them to your environment.js in the order you want them tried.

```js
  emberStereo: {
    initialVolume: 100, // default = 100
    silenceErrors: false // true = silence thrown audio errors app wide, and handle them inline
    connections: [ // default = 'NativeAudio' only
      {name: 'NativeAudio'},
      {name: 'Howler'},
      {name: 'HLS'}
    ]
  }
```
