# ember-stereo

## The best way to play audio in your modern ember app

![Download count all time](https://img.shields.io/npm/dt/ember-stereo.svg) [![npm version](https://img.shields.io/npm/v/ember-stereo.svg?style=flat-square)](https://www.npmjs.com/package/ember-stereo) [![Ember Observer Score](http://emberobserver.com/badges/ember-stereo.svg)](http://emberobserver.com/addons/ember-stereo)
[![Maintainability](https://api.codeclimate.com/v1/badges/24a53d2c7a91e15d7200/maintainability)](https://codeclimate.com/github/jkeen/ember-stereo/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/24a53d2c7a91e15d7200/test_coverage)](https://codeclimate.com/github/jkeen/ember-stereo/test_coverage)

This addon exposes a `stereo` service which produces `Sound` objects which represent a playable piece of audio.

The `stereo` service makes it easy to play audio in the unfriendly landscape that is the current state of audio on the web. Forget worrying about formats and browsers and just give `stereo` a list of URLs to try and it'll play the first one that works.
## Installing The Addon

```shell
ember install ember-stereo
```

### Upgrading from `ember-hifi`
  Read the [upgrade guide](https://jkeen.github.com/ember-stereo)
### API

#### Template Helpers
`ember-stereo` includes many template helpers for interacting with audio files


##### Actions

- `play-sound`
```hbs
  <button type="button" class="button is-link" {{on 'click' (play-sound @url)}}>Play</button>
```

- `load-sound`
```hbs
  <button type="button" class="button is-link" {{on 'click' (load-sound @url)}}>Play</button>
```

- `pause-sound`
```hbs
  <button type="button" class="button is-link" {{on 'click' (pause-sound @url)}}>Pause</button>
```

- `stop-sound`
```hbs
<button type="button" class="button is-link" {{on 'click' (stop-sound @url)}}>Stop</button>
```

- `fastforward-sound`
```hbs
<button type="button" class="button is-link" {{on 'click' (fastforward-sound @url increment=5000)}}>Fast Forward</button>
```

- `rewind-sound`
```hbs
<button type="button" class="button is-link" {{on 'click' (rewind-sound @url increment=5000)}}>Rewind</button>
```

- `seek-sound`
```hbs
<button type="button" class="button is-link" {{on 'click' (seek-sound @url position=5000)}}>Seek</button>
```

- `toggle-play-sound`
```hbs
<button type="button" class="button is-link" {{on 'click' (toggle-play-sound @url)}}>Play/Pause</button>
```

##### Conditionals
- `sound-is-errored`

```hbs
  {{#if (sound-is-errored @url)}}
    {{sound-error-details @url}}
  {{/if}}
```

- `sound-is-fastforwardable`

```hbs
  {{#if (sound-is-fastforwardable @url)}}
    <button type="button" class="button is-link" {{on 'click' (fastforward-sound @url increment=5000)}}>Fast Forward</button>
  {{/if}}
```

- `sound-is-rewindable`

```hbs
  {{#if (sound-is-rewindable @url)}}
    <button type="button" class="button is-link" {{on 'click' (rewind-sound @url increment=5000)}}>Fast Forward</button>
  {{/if}}
```

- `sound-is-loaded`
```hbs
  {{#if (sound-is-loaded @url)}}
    sound is loaded and ready to play
  {{/if}}
```

- `sound-is-loading`
```hbs
  {{#if (sound-is-loading @url)}}
    [show loading spinner]
  {{/if}}
```

- `sound-is-playing`
```hbs
  {{#if (sound-is-playing @url)}}
    <button type="button" class="button is-link" {{on 'click' (pause-sound @url)}}>Pause</button>
  {{/if}}
```

- `sound-is-rewindable`
```hbs
  {{#if (sound-is-rewindable @url)}}
    Sound is rewindable
  {{/if}}
```

- `sound-is-fastforwardable`
```hbs
  {{#if (sound-is-rewindable @url)}}
    Sound is fastforwardable
  {{/if}}
```

- `sound-is-seekable`
```hbs
  {{#if (sound-is-rewindable @url)}}
    Sound is fastforwardable
  {{/if}}
```

- `sound-is-blocked`
```hbs
  {{#if (sound-is-blocked @url)}}
    Browser has blocked auto play, needs user input
  {{/if}}
```

- `autoplay-allowed`
```hbs
  {{#if (autoplay-allowed @url)}}
    Browser allows autoplaying of sounds
  {{/if}}
```

### Getters

- `sound-metadata`
```hbs
  {{sound-metadata @url}}
```

- `sound-duration(@url, load=false, format=false)`
```hbs
  {{sound-duration @url load=true format=time}}
```

- `sound-position(@url, format=false defaultValue=0)`
```hbs
  {{sound-position @url format=percentage}} #=> 12
  {{sound-position @url format=time}} #=> 00:20
```

- `current-sound`
```hbs
  {{current-sound}} #=> currently playing/paused sound
```

- `find-loaded-sound`
```hbs
  {{find-loaded-sound @url}} #=> currently playing/paused sound
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


###### Gettable/Settable Properties
- `volume`          (integer, 0-100)

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

- `position`        (integer, in ms)

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

- `isLoading`         (boolean)
- `isPlaying`         (boolean)
- `isStream`          (boolean)
- `isFastForwardable` (boolean)
- `isRewindable`      (boolean)

- `duration`          (integer, in ms)
- `percentLoaded`     (integer 0-100, when available)

- `currentSound`      the currently loaded sound

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

## Test Helpers
#### Acceptance Tests

Import this helper into acceptance tests to stub out stereo.

```javascript
import '[your-app-name]/tests/helpers/stereo-acceptance-helper';
```

#### Unit Tests + Integration Tests

If you have a unit test that interacts with ember-stereo, you might get some errors if stereo's needs aren't met. Hifi uses some internal services that we'd hate for you to have to know about or type out, so just use our helper instead.

```javascript
import { stereoNeeds, dummyStereo } from 'overhaul/tests/helpers/stereo-integration-helpers';

moduleFor('[your module]', 'Unit | [type] | [your module]', {
  needs: [...stereoNeeds]

...
});
```

If you need to fake out the stereoService to test how your app handles stereo events, you can use the dummyStereo service

```javascript
import { stereoNeeds, dummyStereo } from 'overhaul/tests/helpers/stereo-integration-helpers';

moduleFor('[your module]', 'Integration | [type] | [your module]', {
  needs: [...stereoNeeds],

  beforeEach() {
    this.register('service:stereo', dummyStereo);
    this.inject.service('stereo');
  }
...
});
```

After stubbing out the service with the dummyStereo service you can pass it some special urls in the format `/:status/:length/:name` to mimic responses, where `status` can be `good` or `bad`, and `length` can be an integer representing the duration in ms, or `stream`.

A 10 second audio clip: `/good/10000/test`

A web stream: `/good/stream/test`

A url that will fail: `/bad/stream/test`


## [Writing Your Own Stereo Connection](CUSTOM_CONNECTIONS.md)

Do you need to support a funky audio format that stereo's built-in connections can't handle? Read more about how to write your own custom connection [here](CUSTOM_CONNECTIONS.md).
