const webpack =           require('webpack');

let commonsPlugin = new webpack.optimize.CommonsChunkPlugin({
    name: "vendor"
  });

module.exports = {
  entry: {  
    home: './public/home/src/index.js',
    market: './public/market/src/index.js',
    landing: './public/landing/src/index.js'
    },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(otf|svg|eot|woff|woff2|ttf|jpg|jpeg|png|gif|md)$/,
        loaders: ['url-loader']
      },
      {
        test: /\.json$/,
        loaders: ['json-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/public/dist',
    publicPath: '/',
    filename: '[name]-bundle.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    commonsPlugin
  ],
  devServer: {
    contentBase: './public/dist',
    hot: true
  }
};
