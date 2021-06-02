import Ember from 'ember';
import DummyConnection from 'ember-stereo/stereo-connections/dummy-connection';

Ember.Test.onInjectHelpers( function(app) {
  let service = app.__container__.lookup('service:stereo');
  app.register('stereo-connection:local-dummy-connection', DummyConnection, {instantiate: false});

  let activeDummy = service._activateConnection({name: 'LocalDummyConnection'});
  service.set('_connections', [activeDummy]);
});
