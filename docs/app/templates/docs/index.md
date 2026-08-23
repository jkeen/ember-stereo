### **`ember-stereo`**

<span class="text-xl">is an addon that makes it easy to reactively handle all sorts of audio files in your ember app.</span>

<Docs::AttentionGetter />

# Install

```shell
ember install ember-stereo
```

## Connections

A connection is a plugin that knows how to play a particular kind of audio. Given a URL the service tries each one in turn until one works, always starting with a native `<audio>` element.

- `NativeAudio` - the browser's own `<audio>`. Plays whatever the browser supports, and goes first on mobile.
- `Howler` - [howler.js](https://github.com/goldfire/howler.js).
- `HLS` - [HLS.js](https://github.com/video-dev/hls.js/), for [HLS streams](https://caniuse.com/http-live-streaming).

List the ones you want in `environment.js`, in the order to try them:

```js
  emberStereo: {
    initialVolume: 100, // default = 100
    silenceErrors: false, // true = handle audio errors inline instead of throwing
    connections: [ // default = 'NativeAudio' only
      {name: 'NativeAudio'},
      {name: 'Howler'},
      {name: 'HLS'}
    ]
  }
```

[Casting](/docs/casting) adds two more connections, which the service wires up automatically when needed.

## History

This project started as [`ember-hifi`](http://github.com/nypublicradio/ember-hifi) in 2016, an open source audio library funded by New York Public Radio and built by me ([Jeff Keen](http://github.com/jkeen)) and my pal and former WNYC engineer [Brian Whitton](http://github.com/noslouch).
