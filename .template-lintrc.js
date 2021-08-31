'use strict';

const stereoHelpers = [
  'current-sound',
  'sound-position',
  'sound-duration',
  'stereo-volume',
  'sound-metadata',
  'sound-is-loaded',
  'sound-is-loading',
  'sound-is-playing',
  'sound-is-errored',
  'sound-is-blocked',
  'sound-error-details',
  'sound-is-seekable',
  'sound-is-rewindable',
  'sound-is-fastforwardable',
  'toggle-play-sound',
  'toggle-stereo-mute',
  'find-sound',
  'autoplay-allowed',
  'json-stringify']

module.exports = {
  extends: 'recommended',
  'rules': {
    'no-curly-component-invocation': {
      allow: stereoHelpers
    },
    'no-implicit-this': {
      allow: stereoHelpers
    }
  }
};
