import Ember from 'ember';
import NativeAudio from 'ember-stereo/stereo-connections/native-audio';

Ember.Test.onInjectHelpers(function (app) {
  let service = app.__container__.lookup('service:stereo');
  app.register('stereo-connection:local-dummy-connection', NativeAudio, { instantiate: false });

  let activeDummy = service._activateConnection({ name: 'LocalDummyConnection' });
  service.set('_connections', [activeDummy]);
});
