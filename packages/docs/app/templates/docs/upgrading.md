# Upgrading from Hifi

If you're coming from [ember-hifi](http://github.com/nypublicradio/ember-hifi), welcome!

### Why upgrade?

1. Handy template helpers make things ridiculously simpler!
2. Stereo uses [ember-concurrency](http://ember-concurrency.com) tasks instead of the home rolled mixture of rat-nested promises I devised back in 2015 when that sort of thing was in vogue. If you're using `ember-concurrency` tasks in your app you can change your `play` and `load` calls to use the task versions, at `this.stereo.playTask` and `this.stereo.loadTask`
3. Improved tooling to help deal with autoplay problems. An `audio-blocked` event was added, as well as an `autoplay-allowed` helper and a `sound-is-blocked` helper to help deal with autoplay issues. ([fixes hifi issue #44](https://github.com/nypublicradio/ember-hifi/issues/44))
4. Better defaults. Volume is now by default at 100, aka system volume. You can set `initialVolume: 50` in the environment configuration if you want to keep it at its former level.
5. Better docs, better tests, better future! ([fixes hifi issue #25](https://github.com/nypublicradio/ember-hifi/issues/25))

### Upgrade your existing app

1. Find anything that says "hifi", "ember-hifi", or "emberHifi" and rename it "stereo", "ember-stereo", or "emberStereo", respectively. The hifi service is probably the one you'll have the most of, and maybe your environment config.
2. Any event handlers that were expecting `(sound)` should now have a new signature and need to be changed to `({sound})`
   e.g.

  ```js
  //BEFORE
  this.hifi.on('event-name', (sound) => {
    /* handler */
  });

  //AFTER
  this.stereo.on('event-name', ({ sound }) => {
    /* handler */
  });
  ```

3. Whatever tricks you had implement to do in order to catch that uncatchable 'All Promises Failed' error in `hifi` you can remove them. `play` and `load` requests will now fail sanely. And if you don't want them to throw errors at all, instead returning the error as part of the response, you can pass `silenceErrors: true` as an option. (fixes hifi issue [#86](https://github.com/nypublicradio/ember-hifi/issues/86) and [#16](https://github.com/nypublicradio/ember-hifi/issues/16))
4. `this.stereo.connections` has been renamed to `this.stereo.connectionNames`. `this.stereo.connections` now returns the actual connection objects.
