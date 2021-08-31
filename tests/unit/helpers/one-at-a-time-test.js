import Evented from '@ember/object/evented';
import EmberObject from '@ember/object';
import OneAtATime from 'ember-stereo/-private/utils/one-at-a-time';
import { module, test } from 'qunit';

module('Unit | Helper | one at a time', function () {
  /* eslint-disable */
  const Sound = EmberObject.extend(Evented, {
    play() {
      this.trigger('audio-played');
      this.set('isPlaying', true);
    },
    pause() {
      this.trigger('audio-paused');
      this.set('isPlaying', false);
    }
  });
  /* eslint-enable */

  test("only one sound should play at a time", function (assert) {
    assert.expect(3);
    let oneAtATime = new OneAtATime;

    let sound1 = Sound.create({ url: '/good/10000/1.mp3' });
    let sound2 = Sound.create({ url: '/good/10000/2.mp3' });
    let sound3 = Sound.create({ url: '/good/10000/3.mp3' });
    oneAtATime.register(sound1);
    oneAtATime.register(sound2);
    oneAtATime.register(sound3);

    sound1.play();
    assert.deepEqual([sound1, sound2, sound3].map(s => s.get('isPlaying')), [true, false, false], "sound 1 should be the only thing playing");

    sound2.play();
    assert.deepEqual([sound1, sound2, sound3].map(s => s.get('isPlaying')), [false, true, false], "sound 2 should be the only thing playing");

    sound3.play();
    assert.deepEqual([sound1, sound2, sound3].map(s => s.get('isPlaying')), [false, false, true], "sound 3 should be the only thing playing");
  });
});
