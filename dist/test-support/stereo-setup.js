import { _cancelTimers, next } from '@ember/runloop';
import FakeMediaElement from './utils/fake-media-element.js';
import sinon from 'sinon';

function stubAudio() {
  let stereoSandbox = sinon.createSandbox({});
  let originalCreateElement = document.createElement;
  let createElementStub = stereoSandbox.stub(document, 'createElement');
  createElementStub.withArgs('audio').callsFake(() => {
    let fake = new FakeMediaElement(...arguments);
    fake.originalCreate = originalCreateElement;
    return fake;
  });
  createElementStub.withArgs('video').callsFake(() => {
    let fake = new FakeMediaElement(...arguments);
    fake.originalCreate = originalCreateElement;
    return fake;
  });
  createElementStub.callThrough();
  return stereoSandbox;
}
function setupStereoTest(hooks) {
  let stereoSandbox;
  hooks.beforeEach(async function () {
    stereoSandbox = stubAudio();
    this._stereoTimeout = setTimeout(() => {
      _cancelTimers();
    }, 500);
  });
  hooks.afterEach(function () {
    clearTimeout(this._stereoTimeout);

    // Cancel any fake elements that are hanging around
    clearTimeout(window._stereoFakeMediaElementPoller);
    stereoSandbox.restore();
    let stereo = this.owner.lookup('service:stereo');
    if (stereo.isPlaying) {
      stereo.pause();
    }
    stereo.destroy();
  });
}
function stubConnectionCreateWithSuccess(service, connectionName, sandbox = sinon) {
  let Connection = service.connectionLoader.get(connectionName);
  sandbox.stub(Connection, 'canPlay').returns(true);
  let stub = sandbox.stub(Connection.prototype, 'setup');
  return stub.callsFake(function () {
    next(() => this.trigger('audio-ready', {
      sound: this
    }));
  });
}
function stubConnectionCreateWithFailure(service, connectionName, sandbox = sinon) {
  let Connection = service.connectionLoader.get(connectionName);
  sandbox.stub(Connection, 'canPlay').returns(true);
  let stub = sandbox.stub(Connection.prototype, 'setup');
  return stub.callsFake(function () {
    next(() => this.trigger('audio-load-error', {
      sound: this,
      error: 'failed'
    }));
  });
}

export { setupStereoTest, stubAudio, stubConnectionCreateWithFailure, stubConnectionCreateWithSuccess };
//# sourceMappingURL=stereo-setup.js.map
