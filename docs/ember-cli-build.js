'use strict';

const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const path = require('path');
module.exports = function (defaults) {
  let app = new EmberApp(defaults, {
    autoImport: {
      watchDependencies: ['ember-stereo'],
    },
    'ember-cli-addon-docs': {
      documentingAddonAt: '../ember-stereo/',
    },
    sourcemaps: {
      enabled: true,
    },
    svgJar: {
      sourceDirs: ['public'],
    },
    babel: {
      plugins: [require.resolve('ember-auto-import/babel-plugin')],
    },
    postcssOptions: {
      compile: {
        enabled: true, // defaults to true
        browsers: ['last 3 versions'], // this will override config found in config/targets.js
        plugins: [
          {
            module: require('postcss-import'),
          },
          require('tailwindcss')(path.resolve('tailwind.js')),
          require('autoprefixer'),
        ],
        cacheExclude: [],
        cacheInclude: [/.*\.(css|scss|sass|less)$/],
      },
      filter: {
        enabled: true, // defaults to false
        map: false, // defaults to inline, false in production
        browsers: ['last 3 versions'], // this will override config found in config/targets.js
        include: ['styles/*.css', 'styles/components/*.css'],
      },
    },
    snippetSearchPaths: ['app'],
    snippetExtensions: [
      'js',
      'ts',
      'coffee',
      'html',
      'hbs',
      'md',
      'css',
      'sass',
      'scss',
      'less',
      'emblem',
      'yaml',
    ],
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.

  return app.toTree();
};
