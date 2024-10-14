// Prepares options for template helpers
function prepareOptions(options) {
  let newOptions = {
    silenceErrors: true,
    ...options
  };
  // newOptions.remote = remote;
  // if (!newOptions.metadata) {
  //   newOptions.metadata = metadata;
  // }

  // console.log(...arguments)

  return newOptions;
}

export { prepareOptions as default };
//# sourceMappingURL=prepare-options.js.map
