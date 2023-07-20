const path = require('path');

module.exports = {
  mode: 'development',
  entry: {
    login: './frontend/login.js',
    signup: './frontend/signup.js',
    home: './frontend/home.js',
    contact: './frontend/contact.js',
  },
  output: {
    path: path.resolve(__dirname, 'public', 'assets', 'js'),
    filename: '[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },

      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },

      {
        test: /\.ejs$/,
        use: ['ejs-loader'],
      },

      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
    ],
  },
};
