# Upgrading from Hifi

If you're coming from Hifi, welcome! Lots has changed and lots has improved
### Why upgrade?

1. Handy template helpers make things ridiculously simpler!
2. Stereo uses ember-concurrency tasks instead of the `promise-race` utility, which would sometimes throw errors ya just couldn't catch.
3. Improved tooling to help deal with autoplay problems
4. Better defaults. Volume is now by default at 100, aka system volume. You can set `initialVolume: 50` in the environment configuration if you want to keep it at its former level.
5. If you're using `ember-concurrency` tasks you can change your `play` and `load` calls to use the task versions, at `this.stereo.playTask` and `this.stereo.loadTask`
6. Hifi was built on a deep well of nested promises and sometimes it was hard to catch those errors (`All Promises Failed` from `promise-race` comes to mind). With ember concurrency tasks now powering the sound playing attempts, things are more sane.
7. `audio-blocked` event was added, as well as an `autoplay-allowed` helper and a `sound-is-blocked` helper to help deal with autoplay issues
8. Better docs, better tests, better future!

### Upgrade your existing app
  1. Find anything that says "hifi", "ember-hifi", or "emberHifi" and rename it "stereo", "ember-stereo", or "emberStereo", respectively. The hifi service is probably the one you'll have the most of, and maybe your environment config. 
  2. Any event handlers that were expecting `(sound)` should now have a new signature and need to be changed to `({sound})`
    e.g. 
    ```js
    //BEFORE
    this.hifi.on('event-name', (sound) => { /* handler */ }) 
    
    //AFTER
    this.stereo.on('event-name', ({sound}) => { /* handler */ })
    ```
  3. Whatever tricks you had implement to do in order to catch that uncatchable 'All Promises Failed' error in `hifi` you can remove them. `play` and `load` requests will now fail sanely. And if you don't want them to throw errors at all, instead returning the error as part of the response, you can pass `silenceErrors: true`
