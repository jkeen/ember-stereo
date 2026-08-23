# ember-stereo

## The best way to reactively handle audio in your modern ember app

[![CI](https://github.com/jkeen/ember-stereo/actions/workflows/ci.yml/badge.svg)](https://github.com/jkeen/ember-stereo/actions/workflows/ci.yml)
![Download count all time](https://img.shields.io/npm/dt/ember-stereo.svg) [![npm version](https://img.shields.io/npm/v/ember-stereo.svg?style=flat-square)](https://www.npmjs.com/package/ember-stereo) [![Ember Observer Score](http://emberobserver.com/badges/ember-stereo.svg)](http://emberobserver.com/addons/ember-stereo)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

One `stereo` service plays one sound at a time, across whatever the browser offers (native audio, HLS, Howler, AirPlay, Chromecast), with template helpers that make player UI nearly declarative. You address sounds by identifier — usually just a URL string, but also a url object, a `Sound`, an array of any of those, or a promise resolving to any of those.

## Compatibility

- Ember.js v4.12 or above
- Ember CLI v4.12 or above (with ember-auto-import v2 or Embroider)
- Node.js v18 or above

## Installation

```
ember install ember-stereo
```

## Documentation

**The full guide and API reference live at [ember-stereo.com](https://ember-stereo.com/docs), with live demos of everything.**

Upgrading to 6.0? Read the [upgrade guide](https://ember-stereo.com/docs/upgrading).

## What it looks like

```hbs
<button type='button' {{on 'click' (toggle-play-sound @identifier)}}>
  {{#if (sound-is-playing @identifier)}}
    Pause
  {{else if (sound-is-loading @identifier)}}
    Loading…
  {{else}}
    Play
  {{/if}}
</button>

{{sound-position @identifier format=time}}
/
{{sound-duration @identifier format=time}}

<input type='range' {{sound-position-slider @identifier}} />
```

There's a helper or modifier for nearly every piece of player UI (playback, seeking, state, autoplay-blocking, metadata, timestamps) see [the docs](https://ember-stereo.com/docs) for the catalog. From javascript, the service does the same things: `this.stereo.play(urlsOrPromise)` resolves to an identity-stable `Sound` and `findSound(identifier)` returns one synchronously that reports `isLoading`/`isPlaying`/`errors` reactively. See [Playing Sounds](https://ember-stereo.com/docs/playing-sounds).

## Casting (AirPlay & Chromecast)

`ember-stereo` treats a remote device as just another connection that the sound can swap to. AirPlay and Chromecast are wired up automatically and included on demand.

```hbs
<button type='button' {{cast-button}}>
  {{#if (is-casting)}}Casting…{{else if (casting-available)}}Cast{{else}}No cast
    targets{{/if}}
</button>
```

[Casting docs](https://ember-stereo.com/docs/casting)

## Events

The `stereo` service and every `Sound` are evented: `audio-played`, `audio-paused`, `audio-ended`, `audio-blocked`, `current-sound-changed`, the casting events, and more. See [Monitoring Events](https://ember-stereo.com/docs/event-monitoring).

## Included audio connections

1. `NativeAudio` Uses the native `<audio>` element for playing and streaming audio
1. `HLS` Uses HLS.js for playing HLS streams on the desktop.
1. `Howler` Uses [howler](http://howlerjs.com) to play audio

`stereo` will take a list of urls and find the first connection/url combo that works. For desktop browsers, we'll try each url on each connection in the order the urls were specified. For mobile browsers, we'll first try all the URLs on the NativeAudio using a technique to (hopefully) get around any autoplaying restrictions that sometimes require mobile users to click a play button twice.

## Testing

If you need to test audio handling that involves `ember-stereo` in your app, you're gonna need this helper. It sets up and cleans up a few stereo-related items, but most importantly it stubs out the native browser audio and video elements replacing it with a FakeMediaElement that behaves sanely in the test environment.

You can control how the sound behaves by providing a url in one of these formats:

URLs that will successfully load:

- `good/10000/test-url.mp3`: an mp3 that is 10 seconds long
- `good/stream/the-current.aac`: an aac audio stream, duration = Infinity, will behave like a stream does

URLs that will fail:

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
