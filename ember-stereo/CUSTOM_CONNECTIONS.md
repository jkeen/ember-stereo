## Writing Your Own Stereo Connection

Do you need to support a funky audio format that requires a special library, or do you really want to buck this whole HTML5-only strategy and play sounds using Flash? You can make your own stereo connection.

```sh
$ ember generate stereo-connection dash-connection
```

This creates `src/stereo-connections/dash-connection.js` and a unit test at `tests/unit/stereo-connections/dash-connection.js`, which you should now customize.

The files created by the blueprint should walk you through what you need to implement, but to be thorough:

```javascript
let Sound = class Sounds extends BaseSound {
  static canPlayMimeType(/* extension */) {
    // check if connection can play file with this mime type
    return true;
  },

  static canUseConnection() {
    // check to see if this connection will work on this browser/platform
    return true;
  }

  setup() {
    let url   = this.args.url;
    let sound = this;

    // Using the URL, try loading up your sound.

    // Wire up your audio library so it fires these events on this sound class

    // sound.trigger('audio-ready')                     -> when sound is ready to play
    // sound.trigger('audio-load-error', errorMessage)  -> when sound encounters an loading error
    // sound.trigger('audio-loading', info)             -> when sound is loading, optionally include {percentLoaded}

    // sound.trigger('audio-played')                    -> when sound is played
    // sound.trigger('audio-paused')                    -> when sound is paused
    // sound.trigger('audio-ended')                     -> when sound is finished playing
    // sound.trigger('audio-duration-changed')          -> when the audio duration changes
    // sound.trigger('audio-position-changed')          -> when the audio position changes
  }

  teardown() {

  }

  // implement these methods to control your sound

  _setVolume() {
    assert('[stereo-connection: <%= name %>] #_setVolume interface not implemented', false);
  }

  _audioDuration() {
    // return Infinity if source is an audio stream
    assert("[stereo-connection: <%= name %>] #_audioDuration interface not implemented", false);
  }

  _currentPosition() {
    assert("[stereo-connection: <%= name %>] #currentPosition interface not implemented", false);
  }

  _setPosition() {
    assert("[stereo-connection: <%= name %>] #setPosition interface not implemented", false);
  }

  play() {
    assert("[stereo-connection: <%= name %>] #play interface not implemented", false);
  }

  pause() {
    assert("[stereo-connection: <%= name %>] #pause interface not implemented", false);
  }

  stop() {
    // Stop playback and make sure no more audio is downloading
    assert("[stereo-connection: <%= name %>] #stop interface not implemented", false);
  }
}
```

`canPlayMimeType` and `canUseConnection` are called when `stereo` is looking for connections to try with a url. Give your best guess here. For instance, our built-in HLS.js library won't work on mobile, so `canUseConnection` returns false on a mobile device and true on a desktop browser. Similary, HLS only plays `application/vnd.apple.mpegurl` files, so we just check for that extension in `canPlayMimeType`.

##### Implement methods to bridge communication between stereo and your third party library.

- `setup()`
  Wire up your library to trigger the following methods when things happen on your sound:

Required events to be implemented:

- `sound.trigger('audio-ready')` - sound is ready to play
- `sound.trigger('audio-load-error', error)` - loading sound failed
- `sound.trigger('audio-played')`
- `sound.trigger('audio-paused')`
- `sound.trigger('audio-ended')` - we finished playing the sound

Optional (but nice to have) events:

- `sound.trigger('audio-position-changed')` - when the playhead position changes
- `sound.trigger('audio-loading', {percentLoaded: percent})` - when sound is downloading, update the percentLoaded

```javascript
import dashLibrary from 'your-third-party-library'

let DashConnection = BaseSound.extend({
  @tracked dashSound;

  setup() {
    let url   = this.url;
    let sound = this;

    let dashSound = new dashLibrary({
      url: url,
      onready: function() {
        // Sound is loaded and ready to go.
        sound.trigger("audio-ready")
      },
      onloaderror: function(error) {
        // Couldn't load this sound. Tell stereo to move on and try another url/connection
        sound.trigger('audio-load-error', {error});
      },
      onpause: function() {
        sound.trigger('audio-paused', { sound });
      },
      onplay: function() {
        sound.trigger('audio-played', { sound });
      },
      onend: function() {
        sound.trigger('audio-ended', { sound });
      },
      onseek: function() {
        sound.trigger('audio-position-changed', { sound });
      },
      onloading: function(percentLoaded) {
        sound.trigger('audio-loading', {sound, percentLoaded: percentLoaded});
      }
    })

    this.dashSound = dashSound;
  }
```

- `teardown`

```javascript
  // clean up after yourself
  teardown() {
    this.get('dashSound').destroy();
  }
```

### Other required methods to let stereo control your sound

```javascript
_setVolume(volume) {
  this.dashSound.volume(volume);
},

_audioDuration() { // in ms
  // return Infinity if source is an audio stream
  if (this.dashSound.isStreaming()) {
    return Infinity
  }
  else {
    return this.dashSound.duration
  }
},

_currentPosition() { // in ms
  return this.dashSound.position
},

_setPosition(pos) { // in ms
  return this.dashSound.setPosition(pos)
},

play() {
  this.dashSound.play();
},

pause() {
  this.dashSound.pause();
},

stop() {
  // Stop playback and make sure no more audio is downloading
  this.dashSound.stopDownload();
  this.dashSound.stop();
}

```

### Usage

Once you have implemented your new connection, you can add it to your app's configuration, like so:

```js
module.exports = function(environment) {
  var ENV = {
    emberStereo:
      debug: true,    // get ready for some deep console messages to help you find your way
      connections: [
        {
          name: 'DashConnection',
          config: {
            options: { // these options get passed into your class-level setup
              foo: 'bar'
            }
          }
        }
      ]
    }
  }
```
