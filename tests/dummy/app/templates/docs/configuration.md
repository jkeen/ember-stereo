# Configuration
The `stereo` service manages loading and playing sounds, making sure that only one sound plays at at time, setting volume, and providing system-level events your application can tie into. 

Stereo `connections` are plugins for `ember-stereo` that know how to load particular sound formats. Different devices have different audio capabilities, so given a url the `stereo` service will try each loaded connection until one succeeds. Generally, stereo always tries playing the sound using a native audio element before trying anything else.

```js
  @service stereo;

  @action
  async play(url) {
    let sound = await this.stereo.play(url);
  }
```

The returned `sound` class has the same interface no matter which `connection` created it.

## Connections

  - `NativeAudio`: uses the native `<audio>` element to play sounds. This is prioritized automatically on mobile devices and can play any format the user's browser supports.
  - `Howler`: uses [howler.js](https://github.com/goldfire/howler.js) to play sounds.
  - `HLS` uses [HLS.js](https://github.com/video-dev/hls.js/) to play [.hls streams](https://caniuse.com/http-live-streaming).

Stereo offers three connection options, but only the native audio connection is included by default (to keep bundle size small). To include other audio connections, add them to your environment.js in the order you want them tried.

```
  emberStereo: {
    connections: [
      {name: 'NativeAudio'},
      {name: 'Howler'},
      {name: 'HLS'}
    ]
  }
```
