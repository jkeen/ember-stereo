
const { ThemeManager, Theme } = require('tailwindcss-theming/api');
const { TinyColor } = require('@ctrl/tinycolor')

const palette = {
  // Polar night
  nord0: '#2E3440',
  nord1: '#3B4252',
  nord2: '#434c5e',
  nord3: '#4C566A',

  // Snow storm
  nord4: '#D8DEE9',
  nord5: '#E5E9F0',
  nord6: '#ECEFF4',

  // Frost
  nord7: '#8FBCBB', // 00BCB8
  nord8: '#88C0D0', // 00A2D0
  nord9: '#81A1C1', // 0061C1
  nord10: '#5E81AC', //004DAC

  // Aurora
  nord11: '#BF616A',
  nord12: '#D08770',
  nord13: '#EBCB8B',
  nord14: '#A3BE8C',
  nord15: '#B48EAD',

  white: '#FFFFFF'
};

const dark = new Theme()
  .addColors({
    'accent': {
      0: '#00BCB8',
      1: '#00A2D0',
      2: '#0061C1',
      3: '#004DAC',
    },
    'on-accent': {
      0: '#FFF',
    },
    'background': '#FFF',
    'on-background': palette.nord0,
    'surface': {
      0: palette.nord0,
      1: palette.nord1,
      2: palette.nord2,
      3: palette.nord3,
    },
    'on-surface': {
      0: palette.nord4,
      1: palette.nord5,
      2: palette.nord6,
      3: palette.nord6,
    },
    'attention': {
      'primary': palette.nord7,
      'secondary': palette.nord8,
      'tertiary': palette.nord9,
      'quaternary': palette.nord10,
    },
    'danger': '#f14668',
    'on-danger': '#F9FAFA',
    'success': '#00BCB8',
    'on-success': '#F9FAFA',
    'current': 'currentColor',
  })
  .addCustomVariant('hover', (c) => new TinyColor(c).darken(5), ['accent-0'])

const light = new Theme()
  .addColors({
    'accent': {
      0: '#00BCB8',
      1: '#00A2D0',
      2: '#0061C1',
      3: '#004DAC',
    },
    'on-accent': {
      0: palette.nord4,
    },
    'background': '#FFF',
    'on-background': palette.nord0,
    'surface': {
      0: palette.nord4,
      1: palette.nord5,
      2: palette.nord6,
      3: palette.nord6,
    },
    'on-surface': {
      0: palette.nord0,
      1: palette.nord1,
      2: palette.nord2,
      3: palette.nord3,
    },
    'attention': {
      'primary': palette.nord7,
      'secondary': palette.nord8,
      'tertiary': palette.nord9,
      'quaternary': palette.nord10,
    },
    'danger': '#f14668',
    'on-danger': '#F9FAFA',
    'success': '#00BCB8',
    'on-success': '#F9FAFA',
    'current': 'currentColor',
  })
  .addCustomVariant('hover', (c) => new TinyColor(c).darken(5), ['accent-0'])

const StereoTheme = new ThemeManager()
  .setDefaultTheme(dark.targetable())
// .setDefaultLightTheme(light.setName('light').targetable())
// .setDefaultDarkTheme(dark.setName('dark').targetable());

module.exports = StereoTheme;
