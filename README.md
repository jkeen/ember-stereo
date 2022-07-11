# ember-stereo

## The best way to reactively handle audio in your modern ember app

[![CI](https://github.com/jkeen/ember-stereo/actions/workflows/ci.yml/badge.svg)](https://github.com/jkeen/ember-stereo/actions/workflows/ci.yml)
![Download count all time](https://img.shields.io/npm/dt/ember-stereo.svg) [![npm version](https://img.shields.io/npm/v/ember-stereo.svg?style=flat-square)](https://www.npmjs.com/package/ember-stereo) [![Ember Observer Score](http://emberobserver.com/badges/ember-stereo.svg)](http://emberobserver.com/addons/ember-stereo)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

- Ember.js v3.27 or above
- Ember CLI v3.27 or above
- Node.js v12 or above

* Ember.js v3.24 or above
* Ember CLI v3.24 or above
* Node.js v12 or above


## Installation

```
ember install ember-stereo
```

### Interactive docs at [ember-stereo.com](https://ember-stereo.com/docs)!

##### Upgrading from `ember-hifi`? Read the [upgrade guide](https://jkeen.github.com/ember-stereo)

### API

`ember-stereo` operates on sounds by providing its helpers an identifier. Usually this is just a URL string, but an identifier could also be an object with a url property (and maybe a mimeType property), an already loaded stereo `Sound` object, an array of any of the previous items, or even a promise that resolves to any of the previous. Whatever the case, you're covered.

#### Template Helpers

##### Actions

- `toggle-play-sound`

```hbs
<button
  type='button'
  class='button is-link'
  {{on 'click' (toggle-play-sound @identifier)}}
>Play/Pause</button>
```

- `play-sound`

```hbs
<button
  type='button'
  class='button is-link'
  {{on 'click' (play-sound @identifier)}}
>Play</button>
```

- `pause-sound`

```hbs
<button
  type='button'
  class='button is-link'
  {{on 'click' (pause-sound @identifier)}}
>Pause</button>
```

- `load-sound`

```hbs
<button
  type='button'
  class='button is-link'
  {{on 'click' (load-sound @identifier)}}
>Load</button>
```

- `stop-sound`

```hbs
<button
  type='button'
  class='button is-link'
  {{on 'click' (stop-sound @identifier)}}
>Stop</button>
```

- `fastforward-sound`

```hbs
<button
  type='button'
  class='button is-link'
  {{on 'click' (fastforward-sound @identifier increment=5000)}}
>Fast Forward</button>
```

- `rewind-sound`

```hbs
<button
  type='button'
  class='button is-link'
  {{on 'click' (rewind-sound @identifier increment=5000)}}
>Rewind</button>
```

- `seek-sound`

```hbs
<button
  type='button'
  class='button is-link'
  {{on 'click' (seek-sound @identifier position=5000)}}
>Seek</button>
```

##### Conditionals

- `sound-is-loaded`

```hbs
{{#if (sound-is-loaded @identifier)}}
  sound is loaded and ready to play
{{/if}}
```

- `sound-is-loading`

```hbs
{{#if (sound-is-loading @identifier)}}
  [show loading spinner]
{{/if}}
```

- `sound-is-playing`

```hbs
{{#if (sound-is-playing @identifier)}}
  <button
    type='button'
    class='button is-link'
    {{on 'click' (pause-sound @identifier)}}
  >Pause</button>
{{/if}}
```

- `sound-is-errored`

```hbs
{{#if (sound-is-errored @identifier)}}
  {{sound-error-details @identifier}}
{{/if}}
```

- `sound-is-fastforwardable`

```hbs
{{#if (sound-is-fastforwardable @identifier)}}
  <button
    type='button'
    class='button is-link'
    {{on 'click' (fastforward-sound @identifier increment=5000)}}
  >Fast Forward</button>
{{/if}}
```

- `sound-is-rewindable`

```hbs
{{#if (sound-is-rewindable @identifier)}}
  <button
    type='button'
    class='button is-link'
    {{on 'click' (rewind-sound @identifier increment=5000)}}
  >Fast Forward</button>
{{/if}}
```

- `sound-is-seekable`

```hbs
{{#if (sound-is-rewindable @identifier)}}
  Sound is fastforwardable
{{/if}}
```

- `sound-is-blocked`

```hbs
{{#if (sound-is-blocked @identifier)}}
  Browser has blocked auto play, needs user input
{{/if}}
```

- `autoplay-allowed`

```hbs
{{#if (autoplay-allowed @identifier)}}
  Browser allows autoplaying of sounds
{{/if}}
```

### Getters

- `sound-metadata`

```hbs
{{sound-metadata @identifier}}
```

- `sound-duration(@identifier, load=false, format=false)`

```hbs
{{sound-duration @identifier load=true format=time}}
```

- `sound-position(@identifier, format=false defaultValue=0)`

```hbs
{{sound-position @identifier format=percentage}}
#=> 12
{{sound-position @identifier format=time}}
#=> 00:20
```

- `current-sound`

```hbs
{{current-sound}} #=> currently playing/paused sound
```

- `find-sound`

```hbs
{{find-sound @identifier}} #=> currently playing/paused sound
```

#### Service API

`stereo` plays one sound at a time. Multiple sounds can be loaded and ready to go, but only one sound plays at a time. The currently playing sound is set to `currentSound` on the service, and most methods and properties on the service simply proxy to that sound.

###### Methods

- `play(urlsOrPromise, options)`

`play` calls `load` with the same arguments, and then on success plays the sound, returning it to you.

`play` can take one or more URLs, or a promise returning one or more URLs.

If the audio URLs are not known at the time of a play event, give `play` the promise to resolve, otherwise your mobile users might have to click the play button twice (due to some restrictions on autoplaying audio).

```javascript
export default class StereoComponent extends Component {
  @service stereo
  ...
  @action
  play(id) {
    let urlPromise = this.store.findRecord('story', id).then(story => story.getProperties('aacUrl', 'hlsUrl'))

    this.stereo.play(urlPromise).then(({sound}) => {
      // sound object

    }).catch(error => {

    })
  }
}
```

If you already know the URLs, just pass them in.

```javascript
export default class StereoComponent extends Component {
  @service stereo
  ...
  @action
  play(urls) {
    this.stereo.play(urls).then(({sound}) => {
      // sound object

    }).catch(error => {

    })
  }
}
```

- `playTask(urlsOrPromise, options)` the ember concurrency task that `play` calls.

- `pause()`
  Pauses the current sound

- `togglePause()`
  Toggles the play state of the current sound

- `fastForward(duration)`
  Moves the playhead of the current sound forwards by duration (in ms)

- `rewind(duration)`
  Moves the playhead of the current sound backwards by duration (in ms)

- `load(urlsOrPromise, options)`
  Tries each stereo connection with each url and returns the ready `sound` from the first combination that works. The sound is cached internally so on subsequent load requests with the same url the already prepared sound will be returned. Calling `play` on the returned sound will start playback immediately.

- `loadTask(urlsOrPromise, options)` the ember concurrency task that `load` calls.

- `findSound(identifier)`
  Returns a sound once it loads. This works reactively, so you can do something like:

```javascript
export default class StereoComponent extends Component {
  @service stereo
  ...

  get sound() {
    return this.stereo.findSound(this.args.identifier)
  }
}
```

###### Gettable/Settable Properties

- `volume` (integer, 0-100)

System volume. Bind a range element to this property for a simple volume control

```javascript

//component.js
import { inject as service } from "@ember/service";
export default Component.extend({
  stereo: service(),
})

//template.hbs
{{input type="range" value=stereo.volume}}
```

- `position` (integer, in ms)

Here's a silly way to make a position control, too.

```javascript
//component.js
export default Component.extend({
  stereo: service(),
})

//template.hbs
{{input type="range" value=stereo.position min=0 max=stereo.duration step=1000}}
```

###### Read Only Properties

- `isLoading` (boolean)
- `isPlaying` (boolean)
- `isStream` (boolean)
- `isFastForwardable` (boolean)
- `isRewindable` (boolean)

- `duration` (integer, in ms)
- `percentLoaded` (integer 0-100, when available)

- `currentSound` the currently loaded sound

### Sound API

###### Methods

- `play()`
  Plays the sound
- `pause()`
  Pauses the sound
- `togglePause()`
  Toggles the play state of the sound
- `fastForward(duration)`
  Moves the playhead of the sound forwards by duration (in ms)
- `rewind(duration)`
  Moves the playhead of the sound backwards by duration (in ms)

###### Gettable/Settable Properties

- `position` (integer, in ms)

###### Read Only Properties

- `isLoading` (boolean)
- `isPlaying` (boolean)
- `isStream` (boolean)
- `isSeekable` (boolean)
- `isFastForwardable` (boolean)
- `isRewindable` (boolean)

- `duration` (integer, in ms)
- `percentLoaded` (integer, not always available)
- `url` the url of the sound

### Events

The `stereo` service and the `sound` objects are extended with [Ember.Evented](https://www.emberjs.com/api/classes/Ember.Evented.html). You can subscribe to the following events in your application.

###### Triggered on both the sound and relayed through the stereo service

- `audio-played` ({ sound }) - the sound started playing
- `audio-paused` ({ sound }) - the sound was paused
- `audio-ended` ({ sound }) - the sound finished playing
- `audio-load-error` ({ sound }) - loading sound failed
- `audio-ready` ({ sound }) - the sound is ready to play
- `audio-will-rewind` ({sound, currentPosition, newPosition}) - fired before rewinding a sound
- `audio-will-fast-forward` ({sound, currentPosition, newPosition}) - fired before fast-forwarding a sound
- `audio-position-will-change` ({sound, currentPosition, newPosition}) - fired before audio position change
- `audio-position-changed` ({sound})
- `audio-blocked` ({ sound }) - the sound was prevented from being played by the browser due to auto play restrictions

###### Stereo service events

- `current-sound-changed` ({sound, previousSound}) - triggered when the current sound changes. On initial play, previousSound will be undefined.
- `current-sound-interrupted` ({sound, previousSound}) - triggered when a sound has been playing and a new one takes its place by being played, pausing the first one
- `new-load-request` ({loadPromise, urlsOrPromise, options}) - triggered whenever `.load` or `.play` is called.
- `pre-load` ({loadPromise, urlsOrPromise, options}) - triggered whenever `.load` or `.play` is called.

## Details

### Included audio connections

1. `NativeAudio` - Uses the native `<audio>` element for playing and streaming audio
1. `HLS` - Uses HLS.js for playing HLS streams on the desktop.
1. `Howler` - Uses [howler](http://howlerjs.com) to play audio

`stereo` will take a list of urls and find the first connection/url combo that works. For desktop browsers, we'll try each url on each connection in the order the urls were specified.

For mobile browsers, we'll first try all the URLs on the NativeAudio using a technique to (hopefully) get around any autoplaying restrictions that sometimes require mobile users to click a play button twice.

# Testing

If you need to test audio handling that involves `ember-stereo` in your app, you're gonna need this helper. It sets up and cleans up a few stereo-related items, but most importantly it stubs out the native browser audio and video elements replacing it with a FakeMediaElement that behaves sanely in the test environment.

You can control how the sound behaves by providing a url in one of these formats:

## URL Formats

#### URLs that will successfully load:

- `good/10000/test-url.mp3`: an mp3 that is 10 seconds long
- `good/stream/the-current.aac`: an aac audio stream, duration = Infinity, will behave like a stream does

#### URLs that will fail

- `bad/codec-error/the-current.aac`: an aac sound that will fail with 'codec-error'
- `bad/some%20custom%20string/the-current.aac`: an aac sound that will fail with error message 'some custom string'

Here's an example test, testing an example player, making sure that fast forward and rewind buttons are disabled.

```javascript
import { setupStereoTest } from 'ember-stereo/test-support/stereo-setup';

module('Integration | Component | player', function (hooks) {
  setupStereoTest(hooks);

  test('it does not display rewind and ff buttons when stream', async function (assert) {
    let stereo = this.owner.lookup('service:stereo');
    await stereo.play('/good/stream/test.mp3', {
      metadata: {
        show,
        track,
      },
    });
    await render(hbs`<Player/>`);

    assert.dom('[data-test-element="fastforward-button"]').isDisabled();
    assert.dom('[data-test-element="rewind-button"]').isDisabled();
    assert.dom('[data-test-element="play-pause-button"]').exists();
  });
});
```

## [Writing Your Own Stereo Connection](CUSTOM_CONNECTIONS.md)

Do you need to support a funky audio format that stereo's built-in connections can't handle? Read more about how to write your own custom connection [here](CUSTOM_CONNECTIONS.md).
