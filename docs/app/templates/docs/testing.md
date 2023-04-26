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
