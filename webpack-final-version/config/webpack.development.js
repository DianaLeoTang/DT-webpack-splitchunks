const { join, resolve } = require('path');
const FriendlyErrorsWebpackPlugin = require('@soda/friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const logo = join(__dirname, 'icon.png');
const WebpackBuildNotifierPlugin = require('webpack-build-notifier');
const notifier = require('node-notifier');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');

const prot = 3000;

module.exports = {
  devServer: {
    historyApiFallback: true,
    proxy: {
      '/api': 'http://localhost:' + prot,
    },
    static: {
      directory: join(__dirname, '../dist'),
    },
    hot: true,
    port: prot,
  },
  output: {
    publicPath: '/',
    filename: 'scripts/[name].bundle.js',
    assetModuleFilename: 'images/[name].[ext]',
  },
  stats: 'errors-only',
  devtool: false,
  plugins: [
    new BundleAnalyzerPlugin(),
    // new WebpackBuildNotifierPlugin({
    //   title: '💿 Solv Dvelopment Notification',
    //   logo,
    //   suppressSuccess: true,
    // }),
    new HtmlWebpackPlugin({
      title: 'Solv Dapp Testenv',
      filename: 'index.html',
      favicon: './src/web/favicon.ico',
      template: resolve(__dirname, '../src/web/index-dev.html'),
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['You application is running here http://localhost:' + prot],
        notes: ['💊 构建信息请及时关注窗口右上角'],
      },
      onErrors: function (severity, errors) {
        if (severity !== 'error') {
          return;
        }
        const error = errors[0];
        // console.log(error);
        notifier.notify({
          title: '👒 Webpack Build Error',
          message: severity + ': ' + error.name,
          subtitle: error.file || '',
          icon: join(__dirname, 'icon.png'),
        });
      },
      clearConsole: true,
    }),
    new webpack.SourceMapDevToolPlugin({ exclude: '/node_modules/*' }),
  ],
};
