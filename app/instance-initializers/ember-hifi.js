import config from '../config/environment';
import sharedAudioAccess from '../utils/shared-audio-access';

export function initialize(application) {
  debugger
  const { emberHifi, environment = 'development' } = config;
  const options = { emberHifi, environment };
  application.register('config:hifi', options, { instantiate: false });
  application.register('hifi:sharedAudioAccess', sharedAudioAccess, { instantiate: true })
  application.inject('service:hifi', 'options', 'config:hifi');
}

export default {
  name: 'ember-hifi',
  initialize
};
