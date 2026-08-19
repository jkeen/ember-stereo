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
            // ember-source 7 dropped legacy vendor paths, handled in ember-cli 6.12+
            'ember-cli': 'latest',
            'ember-cli-htmlbars': 'latest',
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': 'beta',
            'ember-cli': 'latest',
            'ember-cli-htmlbars': 'latest',
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': 'alpha',
            'ember-cli': 'latest',
            'ember-cli-htmlbars': 'latest',
          },
        },
      },
      {
        // ember-concurrency is a peer dependency, so test-app decides which version the addon builds
        // against. It runs on 4 by default, and this scenario covers the rest of the declared range.
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
