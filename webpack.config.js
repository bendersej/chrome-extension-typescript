require('dotenv').config();
const path = require('path');
const Dotenv = require('dotenv-webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');

module.exports = {
  entry: {
    [process.env.APP_DIST_LOCATION]: './src/client/index.ts',
    'content-script': './src/extension/content-script.ts',
    background: './src/extension/background.ts',
  },
  output: {
    filename: (chunkData) => {
      if (chunkData.chunk.name.includes(process.env.APP_DIST_LOCATION)) {
        return '[name].[hash].js';
      }
      return '[name].js';
    },
    path: path.resolve(__dirname, 'dist/extension'),
  },
  mode: 'development',
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new CopyWebpackPlugin([
      {
        from: 'src/extension/manifest.json',
        force: true,
        // Production Manifest
        // transform(content, path) {
        //   const contentToJson = JSON.parse(content.toString('utf8'));
        //   delete contentToJson.background;

        //   return Buffer.from(JSON.stringify(contentToJson));
        // },
      },
    ]),
    new ChromeExtensionReloader({
      port: 9090,
      reloadPage: true,
      entries: {
        ContentScript: 'content-script',
        background: 'background',
      },
    }),
    new AssetsPlugin({
      filename: '/dist/assets-manifest.json',
      prettyPrint: true,
      metadata: {
        release: require('./src/extension/manifest.json').version,
        env: 'development',
      },
    }),
    new Dotenv({
      path: './.env',
    }),
  ],
};
