/* eslint-disable global-require */
/* eslint-disable import/no-extraneous-dependencies */
module.exports = {
  plugins: [require('tailwindcss')('./src/tailwind.config.js'), require('postcss-preset-env')],
};
