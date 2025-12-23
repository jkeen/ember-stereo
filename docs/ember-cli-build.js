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
      plugins: [
        require.resolve('ember-concurrency/async-arrow-task-transform'),
        require.resolve('ember-auto-import/babel-plugin'),
      ],
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

  return app.toTree();
};
