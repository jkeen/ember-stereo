import { makeArray } from '@ember/array';
import StereoUrl from './stereo-url.js';

function comparisonKeys(identifiers, exact) {
  return makeArray(identifiers).filter(identifier => typeof identifier === 'string' ? identifier.length > 0 : !!identifier?.url).map(identifier => {
    let stereoUrl = new StereoUrl(identifier);
    return exact ? stereoUrl.href : stereoUrl.key;
  }).filter(Boolean);
}

// exact keeps query and hash, which stream cache-busting relies on.
function isSameAudio(urls1, urls2, {
  exact = false
} = {}) {
  let keys = comparisonKeys(urls2, exact);
  return comparisonKeys(urls1, exact).some(key => keys.includes(key));
}

export { isSameAudio as default };
//# sourceMappingURL=is-same-audio.js.map
