const path = require('path');
const Sass = require('sass');
const { VueLoaderPlugin } = require('vue-loader');

const mode = process.env.NODE_ENV;
const isProduction = mode === 'production';
const excludeNodeModules = /node_modules/;

const entry = {
  'index.js': './index.js',
};

module.exports = {
  mode,
  context: path.resolve(__dirname, 'src'),
  entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]',
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    historyApiFallback: true,
    port: '8080',
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(vue|js)$/,
        exclude: excludeNodeModules,
        loader: 'eslint-loader',
      },
      {
        test: /\.vue$/,
        exclude: excludeNodeModules,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        exclude: excludeNodeModules,
        loader: 'babel-loader',
      },
      {
        test: /\.scss$/,
        exclude: excludeNodeModules,
        use: [
          'vue-style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: `${isProduction ? '[name]-[local]-' : ''}[sha512:hash:base64:5]`,
              },
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
            },
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: Sass,
            },
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm-browser.js',
      '~': path.resolve(__dirname, 'src'),
    },
  },
};
