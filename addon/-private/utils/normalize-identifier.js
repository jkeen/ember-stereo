import StereoUrl from './stereo-url';
import BaseSound from 'ember-stereo/stereo-connections/base';

export default function normalizeIdentifier(identifier) {
  if (typeof identifier === 'string') {
    return new StereoUrl(identifier).key;
  } else if (identifier instanceof StereoUrl) {
    return identifier.key;
  } else if (identifier instanceof BaseSound) {
    return new StereoUrl(identifier.url).key;
  } else if (typeof identifier === 'object' && identifier?.url) {
    return new StereoUrl(identifier).key;
  } else {
    return identifier;
  }
}
