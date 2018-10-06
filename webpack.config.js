const CleanWebpackPlugin = require('clean-webpack-plugin')

const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [{ 
          loader: "html-loader", 
          options: {
            minimize: false,
            interpolate: true // allow html snippets with commonJs require tags
          } 
        }]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      { // Process javascript
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      { // Handle images
        test: /\.(png|svg|jpg|gif)$/,
        use: {  
          loader: 'file-loader',
          options: {
            name: "[name].[ext]",
            // ./mysource_files/
            outputPath: 'mysource_files/'
          }
        }
      },
      { //handle fonts
          test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
          use: [{
              loader: 'file-loader',
              options: {
                  name: './mysource_files/[name].[ext]'
                  // outputPath: 'mysource_files/'
              }
          }]
      }
      
	
      
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist'],{}),
    new HtmlWebPackPlugin({
      template: "src/index.html",
      filename: "./index.html"
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css"
    })
  ]
};

