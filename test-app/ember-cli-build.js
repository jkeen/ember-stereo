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
      plugins: [
        // eslint-disable-next-line n/no-missing-require -- resolves at build time; n's resolver can't follow ember-concurrency's exports subpath
        require.resolve('ember-concurrency/async-arrow-task-transform'),
        require.resolve('ember-auto-import/babel-plugin'),
      ],
    },
  });

  return app.toTree();
};
