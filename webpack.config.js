const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { resolve } = require('path');
module.exports = {
  // entry: {
  //   entry1: './src/entry/entry1.js',
  //   entry2: './src/entry/entry2.js',
  //   modules: './src/modules/module.js',
  // },
  entry: {
    main: resolve('src/index.js'),
    other: resolve('src/other.js'),
    other2: resolve('src/other2.js'),
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    splitChunks: {
      chunks: 'all',
      // minChunks: 1,
      maxInitialRequests: 1,
      // maxAsyncRequests: 1,
      cacheGroups: {
        // vendors: {
        //   chunks: 'initial',
        //   enforce: true,
        //   // name: "chunk-vendors",
        //   test: /[\\/]node_modules[\\/]/,
        //   name(module, chunks, cacheGroupKey) {
        //     console.log('参与');
        //     const moduleFileName = module
        //       .identifier()
        //       .split('/')
        //       .reduceRight((item) => item);
        //     const allChunksNames = chunks.map((item) => item.name).join('~');
        //     return `laoyuan-${cacheGroupKey}-${allChunksNames}-${moduleFileName}`;
        //   },
        //   priority: -10,
        //   // reuseExistingChunk: true,
        // },
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        common: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
        //什么代码会让他生效？？
        commons: {
          name: 'chunk-common',
          minChunks: 2,
          priority: 1,
          enforce: true,
          reuseExistingChunk: true,
        },
        commonsUtils: {
          name: 'chunk-common-utils',
          test: /src[\\/]utils/,
          priority: 1,
          enforce: true,
          reuseExistingChunk: true,
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          enforce: true,
          reuseExistingChunk: true,
          priority: 2,
        },
      },
      minSize: {
        javascript: 10,
        style: 10,
      },
      // maxSize: {
      //   javascript: 120000,
      //   style: 120000,
      // },
    },
  },
  plugins: [new BundleAnalyzerPlugin()],
};
