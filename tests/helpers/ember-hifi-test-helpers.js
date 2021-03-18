import { next } from '@ember/runloop';
import { get } from '@ember/object';
import BaseSound from 'ember-hifi/hifi-connections/base';
import DummySound from 'ember-hifi/hifi-connections/dummy-connection';
import sinon from 'sinon';

const dummyOps = {
  setup() {},
  _audioDuration() {},
  _setVolume() {}
};

function stubConnectionCreateWithSuccess(service, connectionName, sandbox = sinon) {
  let Connection = get(service, `_connections.${connectionName}`);
  sandbox.stub(Connection, 'canPlay').returns(true);

  let stub = sandbox.stub(Connection.prototype, 'setup')
  return stub.callsFake(function() {
    next(() => this.trigger('audio-ready', { sound: this }));
  });
}

function stubConnectionCreateWithFailure(service, connectionName, sandbox = sinon) {
  let Connection =  get(service, `_connections.${connectionName}`);
  sandbox.stub(Connection, 'canPlay').returns(true);
  let stub = sandbox.stub(Connection.prototype, 'setup')
  return stub.callsFake(function() {
    next(() => this.trigger('audio-load-error', { sound: this, error: 'failed' }));
  });
}


export {
  stubConnectionCreateWithSuccess,
  stubConnectionCreateWithFailure,
  dummyOps
};
