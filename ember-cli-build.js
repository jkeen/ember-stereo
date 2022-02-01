'use strict';
const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');
const path = require('path');

module.exports = function (defaults) {
  let app = new EmberAddon(defaults, {
    postcssOptions: {
      compile: {
        cacheInclude: [/.*\.css$/, /.tailwind\.config\.js$/],
        extension: 'css',
        enabled: true,
        plugins: [
          {
            module: require('postcss-import'),
            options: {
              path: 'node_modules'
            }
          },
          require('tailwindcss')(path.join('tests', 'dummy', 'app', 'styles', 'tailwind.config.js')),
          require('autoprefixer')
        ]
      },
    },
    snippetSearchPaths: ['app', 'tests/dummy/app', 'addon'],
    snippetExtensions: ['js', 'ts', 'coffee', 'html', 'hbs', 'md', 'css', 'sass', 'scss', 'less', 'emblem', 'yaml']
  });

  /*
    This build file specifies the options for the dummy test app of this
    addon, located in `/tests/dummy`
    This build file does *not* influence how the addon or the app using it
    behave. You most likely want to be modifying `./index.js` or app's build file
  */

  const { maybeEmbroider } = require('@embroider/test-setup');
  return maybeEmbroider(app, {
    skipBabel: [
      {
        package: 'qunit',
      },
    ],
  });
};
