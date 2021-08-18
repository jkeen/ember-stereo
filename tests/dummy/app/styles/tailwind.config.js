const colors = require('tailwindcss/colors');
const path = require('path');

module.exports = {
  // mode: 'jit',
  // purge: [
  //   '../../app/**/*.{hbs}',
  // ],
  purge: ["./../app/**/*.{hbs}"],

  theme: {
    extend: {
      cursor: {
        'move-x': 'ew-resize',
      },
      'animation': {
        'gradient-x': 'gradient-x 3s ease infinite',
        'gradient-y': 'gradient-y 3s ease infinite',
        'gradient-xy': 'gradient-xy 3s ease infinite',
      },
      'keyframes': {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center'
          }
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          }
        }
      },
      // colors: {
      //   transparent: 'transparent',
      //   current: 'currentColor',
      //   gray: colors.blueGray,
      //   red: {
      //     DEFAULT: 'rgb(230, 59, 59)'
      //   },
      //   blue: colors.sky,
      //   yellow: colors.amber,
      //   primary: {
      //     lighter: '#00DCB8',
      //     DEFAULT: '#02bd9e',
      //     darker: '#029179'
      //   }
      // }
    },
    fill: {
      transparent: 'transparent'
    }
  },
  // variants: {
  //   textColor: ["hover", "dark", "light"],
  //   backgroundColor: ["hover", "dark", "light"]
  // },

  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [
    require('@tailwindcss/forms')(),
    require('tailwindcss-theming')({
      themes: path.join('tests', 'dummy', 'app', 'styles', 'theme.config.js'),
      // preset: 'nord',
    })
  ],
};

