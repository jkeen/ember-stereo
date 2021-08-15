
const { ThemeManager, Theme } = require('tailwindcss-theming/api');

const base = new Theme()
  .addColors({
    'accent': '',
    'accent-secondary': '',
    'accent-tertiary': '',
    'accent-quarternary': '',
    'background': '',
    'background-secondary': '',
    'background-tertiary': '',
    'background-quarternary': '',
    'label': '',
    'label-secondary': '',
    'label-tertiary': '',
    'label-quarternary': '',
    'separator': '',
    'opaque-separator': '',
    'link': '',

    'success': '',
    'failure': '',
    'alert': '',

    'c-gray': '',
    'c-gray-2': '',
    'c-gray-3': '',
    'c-gray-4': '',
    'c-gray-5': '',
    'c-gray-6': '',
  });

const dark = new Theme()
  .addColors({
    'accent': '',
    'accent-secondary': '',
    'accent-tertiary': '',
    'accent-quarternary': '',
    'background': '',
    'background-secondary': '',
    'background-tertiary': '',
    'background-quarternary': '',
    'label': '',
    'label-secondary': '',
    'label-tertiary': '',
    'label-quarternary': '',
    'separator': '',
    'opaque-separator': '',
    'link': '',
    'system-success': '',
    'system-failure': '',
    'system-alert': '',
    'gray': '',
    'gray-2': '',
    'gray-3': '',
    'gray-4': '',
    'gray-5': '',
    'gray-6': '',
  });

module.exports = new ThemeManager()
  .setDefaultTheme(base)          // Sets the `base` theme as the default theme.
  .setDefaultDarkTheme(dark);     // Sets the `dark` theme as the default theme for users that prefer the `dark` scheme.
