import { waitUntil } from '@ember/test-helpers';

// The connection loads hls.js dynamically, so the test app can't import it directly.
function hlsClassFor(sound) {
  return sound.hls.constructor;
}

async function setupHLSSpies(sound, sandbox) {
  await waitUntil(
    () => {
      return !!sound.hls;
    },
    { timeout: 3000 },
  );

  return {
    recoverSpy: sandbox.spy(sound.hls, 'recoverMediaError'),
    switchSpy: sandbox.spy(sound.hls, 'swapAudioCodec'),
    destroySpy: sandbox.spy(sound.hls, 'destroy'),
    startLoadSpy: sandbox.spy(sound.hls, 'startLoad'),
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

function throwFragParsingError(sound, { start = 100, end = 110 } = {}) {
  let HLS = hlsClassFor(sound);
  let data = {
    fatal: true,
    type: HLS.ErrorTypes.MEDIA_ERROR,
    details: HLS.ErrorDetails.FRAG_PARSING_ERROR,
    frag: { start, end },
  };

  sound._onHLSError('hlsError', data, HLS);
}

function firePlayedFragment(sound) {
  let HLS = hlsClassFor(sound);
  sound.hls.trigger(HLS.Events.FRAG_CHANGED, {
    // hls.js 1.7's own FRAG_CHANGED listener reads elementaryStreams, and it swallows the whole event if that throws
    frag: {
      title: '',
      programDateTime: null,
      rawProgramDateTime: null,
      elementaryStreams: {},
    },
  });
}

export {
  throwMediaError,
  throwFragParsingError,
  firePlayedFragment,
  setupHLSSpies,
};
