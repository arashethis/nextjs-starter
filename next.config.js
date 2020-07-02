/* eslint-disable */
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');
const withLess = require('@zeit/next-less');
const withCSS = require('@zeit/next-css');
const lessToJS = require('less-vars-to-js');
const fs = require('fs');
const path = require('path');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

// Where your antd-custom.less file lives
const themeVariables = lessToJS(
  fs.readFileSync(path.resolve(__dirname, './src/styles/antd-theme-vars.less'), 'utf8'),
);

module.exports = withBundleAnalyzer(withLess(withCSS({
  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: themeVariables, // make your antd custom effective
  },
  webpack: (config, { isServer }) => {
    if (isServer) {
      const antStyles = /antd\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          if (typeof origExternals[0] === 'function') {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === 'function' ? [] : origExternals),
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: 'null-loader',
      });
    } else {
      config.plugins.push(new AntdDayjsWebpackPlugin());
    }
    return config;
  },
})));
