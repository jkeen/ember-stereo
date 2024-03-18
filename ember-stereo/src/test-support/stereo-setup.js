import { next } from '@ember/runloop';
import FakeMediaElement from './utils/fake-media-element';
import { _cancelTimers as cancelTimers } from '@ember/runloop';

// FIX ME: this will bite someone, but webpack is not picking up and exporting sinon properly
// with the next line included in the build, the tests will fail with an error like:
// TypeError: sinon__WEBPACK_IMPORTED_MODULE_2___default(...).createSandbox is not a function.
// The tests pass without that for now, so I'm proceeding.

// import sinon from 'sinon'

export function stubAudio() {
  // eslint-disable-next-line no-undef
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

export function setupStereoTest(hooks) {
  let stereoSandbox;
  hooks.beforeEach(async function () {
    stereoSandbox = stubAudio();
    this._stereoTimeout = setTimeout(() => {
      cancelTimers();
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

export function stubConnectionCreateWithSuccess(
  service,
  connectionName,
  sandbox = sinon // eslint-disable-line no-undef
) {
  let Connection = service.connectionLoader.get(connectionName);
  sandbox.stub(Connection, 'canPlay').returns(true);

  let stub = sandbox.stub(Connection.prototype, 'setup');
  return stub.callsFake(function () {
    next(() => this.trigger('audio-ready', { sound: this }));
  });
}

export function stubConnectionCreateWithFailure(
  service,
  connectionName,
  sandbox = sinon // eslint-disable-line no-undef
) {
  let Connection = service.connectionLoader.get(connectionName);
  sandbox.stub(Connection, 'canPlay').returns(true);
  let stub = sandbox.stub(Connection.prototype, 'setup');
  return stub.callsFake(function () {
    next(() =>
      this.trigger('audio-load-error', { sound: this, error: 'failed' })
    );
  });
}
