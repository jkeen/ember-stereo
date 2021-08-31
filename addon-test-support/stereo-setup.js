import sinon from 'sinon';
import { next } from '@ember/runloop';
import FakeMediaElement from 'ember-stereo/-private/utils/fake-media-element';

export function stubAudio() {
  let stereoSandbox = sinon.createSandbox();
  // stereoSandbox.stub(NativeAudio.prototype, 'internalElement').get(() => this.fakeAudioElement)
  // stereoSandbox.stub(SharedAudioAccess, 'createElement').returns(new FakeMediaElement)
  let createElementStub = stereoSandbox.stub(document, 'createElement')
  createElementStub.withArgs('audio').callsFake(() => new FakeMediaElement())
  createElementStub.withArgs('video').callsFake(() => new FakeMediaElement())
  createElementStub.callThrough()

  return stereoSandbox
}


export function setupStereoTest(hooks) {
  let stereoSandbox
  hooks.beforeEach(function () {
    stereoSandbox = stubAudio()

    // stereoSandbox = sinon.createSandbox();
    // // stereoSandbox.stub(NativeAudio.prototype, 'internalElement').get(() => this.fakeAudioElement)
    // // stereoSandbox.stub(SharedAudioAccess, 'createElement').returns(new FakeMediaElement)
    // let createElementStub = stereoSandbox.stub(document, 'createElement')
    // createElementStub.withArgs('audio').callsFake(() => new FakeMediaElement())
    // createElementStub.withArgs('video').callsFake(() => new FakeMediaElement())
    // createElementStub.callThrough()
  });

  hooks.afterEach(function () {
    // let service = this.owner.lookup('service:stereo');
    // service.destroy();
    stereoSandbox.restore();
    let stereo = this.owner.lookup('service:stereo')
    stereo.destroy()
  })

}

export function stubConnectionCreateWithSuccess(service, connectionName, sandbox = sinon) {
  let Connection = service.connectionLoader.get(connectionName)
  sandbox.stub(Connection, 'canPlay').returns(true);

  let stub = sandbox.stub(Connection.prototype, 'setup')
  return stub.callsFake(function () {
    next(() => this.trigger('audio-ready', { sound: this }));
  });
}

export function stubConnectionCreateWithFailure(service, connectionName, sandbox = sinon) {
  let Connection = service.connectionLoader.get(connectionName)
  sandbox.stub(Connection, 'canPlay').returns(true);
  let stub = sandbox.stub(Connection.prototype, 'setup')
  return stub.callsFake(function () {
    next(() => this.trigger('audio-load-error', { sound: this, error: 'failed' }));
  });
}
