'use strict';

const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    usePnpm: true,
    scenarios: [
      embroiderSafe(),
      embroiderOptimized(),
      {
        name: 'ember-lts-4.12',
        npm: {
          devDependencies: {
            'ember-source': '~4.12.0',
          },
        },
      },
      {
        name: 'ember-lts-5.12',
        npm: {
          devDependencies: {
            'ember-source': '~5.12.0',
          },
        },
      },
      {
        name: 'ember-lts-6.12',
        npm: {
          devDependencies: {
            'ember-source': '~6.12.0',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': 'latest',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': 'beta',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': 'alpha',
          },
        },
      },
      {
        // ember-concurrency is a peer dependency, so test-app decides which version
        // the addon builds against. It runs on 4 by default to match the apps that
        // consume ember-stereo; this scenario covers the other half of the declared
        // `^4.0.6 || ^5.0.0` range.
        name: 'ember-concurrency-5',
        npm: {
          devDependencies: {
            'ember-concurrency': '^5.2.0',
          },
        },
      },
    ],
  };
};
