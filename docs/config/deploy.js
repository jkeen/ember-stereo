/* eslint-env node */
'use strict';

module.exports = function (deployTarget) {
  let ENV = {
    build: {},
    git: {
      repo: 'git@github.com:jkeen/ember-stereo.git',
    },
    'git-ci': {
      // Pass the key as a file PATH, never as the `deployKey` value.
      // ember-cli-deploy logs config values (including defaults like
      // `deployKey`, which is read from process.env.DEPLOY_KEY) under
      // --verbose, which would print the private key into the CI logs. A path
      // is not secret, so this keeps the key out of the log entirely.
      deployKeyPath: process.env.DEPLOY_KEY_PATH,
    },
  };

  if (deployTarget === 'development') {
    ENV.build.environment = 'development';
    // configure other plugins for development deploy target here
  }

  if (deployTarget === 'staging') {
    ENV.build.environment = 'production';
    // configure other plugins for staging deploy target here
  }

  if (deployTarget === 'production') {
    ENV.build.environment = 'production';
    // configure other plugins for production deploy target here
  }

  // Note: if you need to build some configuration asynchronously, you can return
  // a promise that resolves with the ENV object instead of returning the
  // ENV object synchronously.
  return ENV;
};
