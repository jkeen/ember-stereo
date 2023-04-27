/* eslint-disable */
'use strict';

var path = require('path');
var Funnel = require('broccoli-funnel'); //eslint-disable-line
var mergeTrees = require('broccoli-merge-trees'); //eslint-disable-line

module.exports = {
  name: 'ember-stereo',
  options: {
    svgJar: {
      sourceDirs: ['public', 'tests/dummy/public/assets/images/'],
    },
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
    autoImport: {},
  },
  included(app, parentAddon) {
    this._super.included.apply(this, arguments);
    this.getStereoConnections();
  },

  getStereoConnections: function () {
    if (this.stereoConnections) {
      return;
    }

    let projectConfig = this.project.config(process.env.EMBER_ENV);
    let stereoConfig = projectConfig.emberStereo;

    if (stereoConfig && stereoConfig.connections) {
      this.stereoConnections = stereoConfig.connections.map(
        (connection) => connection.name
      );
    } else {
      // Default
      this.stereoConnections = ['NativeAudio', 'HLS', 'Howler'];
    }
  },

  isDevelopingAddon: function () {
    return true;
  },
};
