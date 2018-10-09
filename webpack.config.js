const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require('webpack');


const path = require('path');
const fs = require('fs');
const glob = require("glob");


// Our function that generates our html plugins
function generateHtmlPlugins (templateDir) {
  // Read files in /html directory 
  const templateFiles = fs
    .readdirSync(path.resolve(__dirname, templateDir))
    .filter(function(file){ //ignore folder
      return file.indexOf(".html") > -1
    })
  return templateFiles.map(item => {
    // Split names and extension
    const parts = item.split('.')
    const name = parts[0]
    const extension = parts[1]
    // Create new HTMLWebpackPlugin with options
    return new HtmlWebPackPlugin({
      filename: `${name}.html`,
      template: path.resolve(__dirname, `${templateDir}/${name}.${extension}`)
    })
  })
}
const htmlPlugins = generateHtmlPlugins('./src/html')



let jsEntryArray = glob.sync('./src/modules/**/global.js') // Returns Array of files


module.exports = env => {
  console.log('environment:' + env.NODE_ENV)
  return {
    entry: ['./src/index.js'].concat(jsEntryArray),
    output: {
      path: path.resolve(__dirname, 'dist'), // Output folder
      filename: 'js/main.js' // JS output path
    },
    devServer: {
      contentBase: './dist',
      hot: true
    },
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
            (env.NODE_ENV === 'development') ? "style-loader" : MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
            "sass-loader",
            "import-glob-loader"
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
                }
            }]
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin(['dist'],{}),
      new webpack.HotModuleReplacementPlugin(),
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[id].css"
      })
    ]
    .concat(htmlPlugins)
  }
  
};

