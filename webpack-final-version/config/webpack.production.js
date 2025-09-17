const TerserPlugin = require('terser-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const os = require('os');
const { join, resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  output: {
    path: join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'scripts/[name].[contenthash:5].bundule.js',
    assetModuleFilename: 'images/[name].[contenthash:5][ext]',
  },
  module: {
    rules: [
      {
        test: /\.(tsx)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: resolve(__dirname, './clearConsole.js'),
      },
    ],
  },
  performance: {
    maxAssetSize: 250000, // 最大资源大小250KB
    maxEntrypointSize: 250000, // 最大入口资源大小250KB
    hints: 'warning', // 超出限制时只给出警告
  },
  optimization: {
    minimize: true,
    minimizer: [
      // terserOptions: { compress:{ pure_funcs: ['console.info', 'console.debug', 'console.warn'] } }
      // new TerserPlugin({
      //   parallel: true,
      //   // terserOptions: {
      //   //   sourceMap: false,
      //   //   compress: {
      //   //     drop_console: true,
      //   //     pure_funcs: ['console.error'],
      //   //   },
      //   // },
      // }),
      new CssMinimizerPlugin({
        parallel: true,
      }),
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Solv',
      filename: 'index.html',
      template: resolve(__dirname, '../src/web/index-prod.html'),
      favicon: './src/web/favicon.ico',
    }),
  ],
};
