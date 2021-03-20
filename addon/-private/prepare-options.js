import { assign } from '@ember/polyfills';

export default function prepareOptions(options = {}, metadata = {}) {
  let newOptions = assign({}, options);

  if (!newOptions.metadata) {
    newOptions.metadata = metadata;
  }

  return newOptions;
}
