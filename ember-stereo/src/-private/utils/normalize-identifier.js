import StereoUrl from './stereo-url';

export default function normalizeIdentifier(identifier) {
  if (typeof identifier === 'string' && identifier !== '') {
    return new StereoUrl(identifier).key;
  } else if (identifier instanceof StereoUrl) {
    return identifier.key;
  } else if (typeof identifier === 'object' && identifier?.url) {
    return new StereoUrl(identifier).key;
  } else {
    return identifier;
  }
}
