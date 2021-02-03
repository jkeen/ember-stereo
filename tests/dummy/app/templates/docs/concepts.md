# Concepts
The `hifi` service manages loading and playing sounds, making sure that only one sound plays at at time, setting volume, and providing system-level events your application can tie into.

Hifi `connections` are factory classes that plug into hifi and know how to load particular sound formats. Different devices have different audio capabilities, so given a url the `hifi` service will try each loaded connection until one succeeds. Generally, hifi always tries playing the sound using a native audio element before trying anything else.

```js
  @service hifi;

  @action
  async play(url) {
    let sound = await this.hifi.play(url);
  }

```


The returned `sound` class has the same interface no matter which `connection` created it.

## Connections

Hifi includes three connection options:
  - a `native-audio` connection that uses the native `<audio>` element. This is prioritized automatically on mobile devices.
  - a `howler` connection that uses [howler.js](https://github.com/goldfire/howler.js)
  - an `hls` connection that uses [HLS.js](https://github.com/video-dev/hls.js/) to play .hls streams.