import sinon from 'sinon';
import { next } from '@ember/runloop';
import FakeMediaElement from 'ember-stereo/-private/utils/fake-media-element';
import { run } from '@ember/runloop';

export function stubAudio() {
  let stereoSandbox = sinon.createSandbox({});
  let createElementStub = stereoSandbox.stub(document, 'createElement');
  createElementStub.withArgs('audio').callsFake(() => new FakeMediaElement());
  createElementStub.withArgs('video').callsFake(() => new FakeMediaElement());
  createElementStub.callThrough();

  return stereoSandbox;
}

export function setupStereoTest(hooks) {
  let stereoSandbox;
  hooks.beforeEach(function () {
    stereoSandbox = stubAudio();
    run.later(() => {
      run.cancelTimers();
    }, 500);
  });

  hooks.afterEach(function () {
    stereoSandbox.restore();
    let stereo = this.owner.lookup('service:stereo');
    stereo.destroy();
  });
}

export function stubConnectionCreateWithSuccess(
  service,
  connectionName,
  sandbox = sinon
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
  sandbox = sinon
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
