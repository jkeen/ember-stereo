'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function (defaults) {
  const app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-stereo'],
      webpack: {
        devtool: 'source-map',
      },
    },
    sourcemaps: {
      enabled: true,
    },
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
  });

  return app.toTree();
};
