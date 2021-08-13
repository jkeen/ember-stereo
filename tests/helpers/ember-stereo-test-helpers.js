import { next } from '@ember/runloop';
import sinon from 'sinon';

const dummyOps = {
  setup() {},
  _audioDuration() {},
  _setVolume() {}
};

function stubConnectionCreateWithSuccess(service, connectionName, sandbox = sinon) {
  let Connection = service.connectionLoader.get(connectionName)
  sandbox.stub(Connection, 'canPlay').returns(true);

  let stub = sandbox.stub(Connection.prototype, 'setup')
  return stub.callsFake(function() {
    next(() => this.trigger('audio-ready', { sound: this }));
  });
}

function stubConnectionCreateWithFailure(service, connectionName, sandbox = sinon) {
  let Connection = service.connectionLoader.get(connectionName)
  sandbox.stub(Connection, 'canPlay').returns(true);
  let stub = sandbox.stub(Connection.prototype, 'setup')
  return stub.callsFake(function() {
    next(() => this.trigger('audio-load-error', { sound: this, error: 'failed' }));
  });
}

function absoluteUrl(fragment) {
  let parser = document.createElement('a')
  parser.href = fragment;

  return parser.href
}


export {
  stubConnectionCreateWithSuccess,
  stubConnectionCreateWithFailure,
  dummyOps,
  absoluteUrl
};
