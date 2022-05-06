import { assign } from '@ember/polyfills';

// Prepares options for template helpers
export default function prepareOptions(options) {
  let newOptions = assign({ silenceErrors: true }, options);
  // newOptions.remote = remote;
  // if (!newOptions.metadata) {
  //   newOptions.metadata = metadata;
  // }

  // console.log(...arguments)

  return newOptions;
}
