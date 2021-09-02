'use strict';

const getChannelURL = require('ember-source-channel-url');
const { embroiderSafe, embroiderOptimized } = require('@embroider/test-setup');

module.exports = async function () {
  return {
    useYarn: true,
    scenarios: [
      embroiderSafe(),
      embroiderOptimized(),
      {
        name: 'ember-3.26.1',
        npm: {
          devDependencies: {
            'ember-source': '~3.26.1',
          },
        },
      },
      {
        name: 'ember-3.27.5',
        npm: {
          devDependencies: {
            'ember-source': '~3.27.5',
          },
        },
      },
      {
        name: 'ember-release',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('release'),
          },
        },
      },
      {
        name: 'ember-beta',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('beta'),
          },
        },
      },
      {
        name: 'ember-canary',
        npm: {
          devDependencies: {
            'ember-source': await getChannelURL('canary'),
          },
        },
      }
    ],
  };
};
