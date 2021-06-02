import config from '../config/environment';
import sharedAudioAccess from 'ember-stereo/-private/utils/shared-audio-access';

export function initialize(application) {
  const { emberStereo, environment = 'development' } = config;
  const options = { emberStereo, environment };
  application.register('config:stereo', options, { instantiate: false });
  application.register('stereo:sharedAudioAccess', sharedAudioAccess, { instantiate: true })
  application.inject('service:stereo', 'options', 'config:stereo');
}

export default {
  name: 'ember-stereo',
  initialize
};
