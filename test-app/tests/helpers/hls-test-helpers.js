import { waitUntil } from '@ember/test-helpers';

async function setupHLSSpies(sound, sandbox) {
  await waitUntil(
    () => {
      return !!sound.hls;
    },
    { timeout: 3000 }
  );

  return {
    recoverSpy: sandbox.spy(sound.hls, 'recoverMediaError'),
    switchSpy: sandbox.spy(sound.hls, 'swapAudioCodec'),
    destroySpy: sandbox.spy(sound.hls, 'destroy'),
  };
}

function throwMediaError(sound) {
  let fakeError = {
    target: {
      error: {
        code: 3,
        MEDIA_ERR_DECODE: 3,
      },
    },
  };

  sound._onVideoError(fakeError);
}

export { throwMediaError, setupHLSSpies };
