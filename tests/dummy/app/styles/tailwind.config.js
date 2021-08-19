/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

const colors = require('tailwindcss/colors');
const path = require('path');

module.exports = {
  // mode: 'jit',
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
      }
    },
    fill: {
      transparent: 'transparent'
    }
  },

  variants: {
    extend: {
      opacity: ['disabled'],
    }
  },
  plugins: [
    require('@tailwindcss/forms')(),
    require('tailwindcss-theming')({
      themes: path.join('tests', 'dummy', 'app', 'styles', 'theme.config.js'),
    })
  ],
};

