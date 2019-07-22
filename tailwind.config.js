const generatePalette = require('@ky-is/tailwind-color-palette');
let { colors } = require('tailwindcss/defaultTheme');

const colorPalette = {
  primary: '#853BFF', // purple
  secondary: '#35B8E8', // cyan
  purple: '#853BFF', // purple
  blue: '#478BFF', // blue
  cyan: '#35B8E8', // cyan
  teal: '#3BFFEA', // teal
};

Object.keys(colorPalette).forEach((tone) => {
  let config = { name: tone };
  if (tone === 'primary') {
    config = Object.assign(config, { grayscale: true, ui: true });
  }
  const palette = generatePalette(colorPalette[tone], config);
  // const background = generatePalette(colorPalette[tone], Object.assign(config, { name: 'bg-' + tone }));
  colors = Object.assign(colors, palette);
});

// See default config https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
const tailwind = {
  theme: {
    colors: colors,
    boxShadow: {
      default: '0 2px 4px rgba(0, 0, 0, 0.18)',
      md: '0 4px 6px rgba(0, 0, 0, 0.18)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.18)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.18)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
      none: 'none',
    },
  },
};

module.exports = tailwind;
