import StereoUrl from './stereo-url.js';
import Sound from '../../stereo-connections/base.js';

function normalizeIdentifier(identifier) {
  if (typeof identifier === 'string') {
    return new StereoUrl(identifier).key;
  } else if (identifier instanceof StereoUrl) {
    return identifier.key;
  } else if (identifier instanceof Sound) {
    return new StereoUrl(identifier.url).key;
  } else if (typeof identifier === 'object' && identifier?.url) {
    return new StereoUrl(identifier).key;
  } else {
    return identifier;
  }
}

export { normalizeIdentifier as default };
//# sourceMappingURL=normalize-identifier.js.map
