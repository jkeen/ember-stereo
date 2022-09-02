'use strict';

const defaultConnections = [
  { name: 'NativeAudio', config: {} },
  { name: 'HLS', config: {} },
  { name: 'Howler', config: {} },
];

module.exports = function (environment, appConfig) {
  appConfig.emberStereo = appConfig.emberStereo || {};
  appConfig.emberStereo.debug =
    appConfig.emberStereo.debug === undefined
      ? false
      : appConfig.emberStereo.debug;

  let configConnections = appConfig.emberStereo.connections || [];

  if (configConnections.length === 0) {
    appConfig.emberStereo.connections = defaultConnections;
  }
};
