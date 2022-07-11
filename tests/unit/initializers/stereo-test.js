import Application from '@ember/application';
import config from 'dummy/config/environment';
import { run } from '@ember/runloop';
import { initialize } from 'dummy/instance-initializers/ember-stereo';
import { module, test } from 'qunit';
import Resolver from 'ember-resolver';

module('Unit | Initializer | ember-stereo', function (hooks) {
  hooks.beforeEach(function () {
    this.StereoApplication = class StereoApplication extends Application {
      modulePrefix = config.modulePrefix;
      podModulePrefix = config.podModulePrefix;
      Resolver = Resolver;
    };
    this.StereoApplication.initializer({
      name: 'initializer under test',
      initialize,
    });

    this.application = this.StereoApplication.create({ autoboot: false });
  });

  hooks.afterEach(function () {
    run(this.application, 'destroy');
  });

  test('it works', async function (assert) {
    await this.application.boot();

    assert.ok(true);
  });
});
