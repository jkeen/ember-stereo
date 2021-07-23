import { assign } from '@ember/polyfills';


// Prepares options for template helpers
export default function prepareOptions({options = {}, metadata = {}, remote = false}) {
  let newOptions = assign({}, options);
  newOptions.remote = remote;
  if (!newOptions.metadata) {
    newOptions.metadata = metadata;
  }

  return newOptions;
}
