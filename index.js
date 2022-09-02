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
  },
  included(app, parentAddon) {
    this._super.included.apply(this, arguments);
    var target = parentAddon || app;

    while (target.app && !target.bowerDirectory) {
      target = target.app;
    }

    this.getStereoConnections();
    if (this.stereoConnections.includes('Howler')) {
      target.import({
        development: 'vendor/third-party/howler.js',
        production: 'vendor/third-party/howler.min.js',
      });

      target.import('vendor/howler.js');
    }

    if (this.stereoConnections.includes('HLS')) {
      target.import({
        development: 'vendor/third-party/hls.js',
        production: 'vendor/third-party/hls.min.js',
      });

      target.import('vendor/hls.js');
    }
  },

  treeForVendor(vendorTree) {
    var trees = [];

    this.getStereoConnections();

    if (vendorTree) {
      trees.push(vendorTree);
    }

    if (this.stereoConnections.includes('Howler')) {
      trees.push(
        new Funnel(path.dirname(require.resolve('howler')), {
          files: ['howler.js', 'howler.min.js'],
          destDir: 'third-party',
        })
      );
    }

    if (this.stereoConnections.includes('HLS')) {
      trees.push(
        new Funnel(path.dirname(require.resolve('hls.js')), {
          files: ['hls.js', 'hls.min.js', 'hls.js.map'],
          destDir: 'third-party',
        })
      );
    }

    return mergeTrees(trees);
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
