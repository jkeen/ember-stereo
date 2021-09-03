import Application from '@ember/application';
import { run } from '@ember/runloop';
import emberStereoInitializer from 'dummy/instance-initializers/ember-stereo';
import { module, test } from 'qunit';

let application;

module('Unit | Initializer | ember-stereo', function (hooks) {
  hooks.beforeEach(function () {
    run(function () {
      application = Application.create();
      application.deferReadiness();
    });
  });


  test('it works', function (assert) {
    emberStereoInitializer.initialize(application);

    // you would normally confirm the results of the initializer here
    assert.ok(true);
  });
});
