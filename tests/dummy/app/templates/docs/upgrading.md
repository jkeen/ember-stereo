# Upgrading from Hifi

If you're coming from Hifi, welcome! Lots has changed and lots has improved


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
  3. When audio playback fails we no longer throw an error, we just return an error object in the promise handler. 
  

### Improvements
  1. Volume is now by default at 100. You can change it in the configuration if you want. 
  2. If you're using `ember-concurrency` and want to use tasks, change your `this.hifi.play()` and `this.hifi.load()` calls to use the task versions, at `this.stereo.playTask` and `this.stereo.loadTask`
  3. Hifi was built on a deep well of nested promises and sometimes it was hard to catch those errors. With ember concurrency tasks now powering the sound playing attempts, things are a little easier to handle
  4. `audio-blocked` event was added 


