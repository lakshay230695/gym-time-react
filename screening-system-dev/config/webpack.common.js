const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

const helpers = require("./helpers");

const NODE_ENV = process.env.NODE_ENV;
const isProd = NODE_ENV === "production";

module.exports = {
  stats: {
    warnings: false
  },
  entry: {
    app: [helpers.root("client/app/index.jsx")]
  },

  output: {
    path: helpers.root("dist"),
    publicPath: "/"
  },

  resolve: {
    extensions: [".js", ".json", ".css", ".scss", ".html", ".jsx"],
    alias: {
      app: "client/app"
    }
  },

  module: {
    rules: [
      // Ignore some Font types
      { test: /(\.woff|\.woff2)$/, loader: 'ignore-loader' },
      { test: /\.ttf$/, loader: 'ignore-loader' },
      { test: /\.eot$/, loader: 'ignore-loader' },
      // CSS files
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      // JS files
      {
        test: /\.jsx?$/,
        include: helpers.root("client"),
        loader: "babel-loader"
      },

      // SCSS files
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                importLoaders: 1
              }
            },
            {
              loader: "postcss-loader",
              options: {
                plugins: () => [autoprefixer]
              }
            },
            "sass-loader"
          ]
        })
      },
      // Image loader
      {
        test: /\.(png|svg|jpg|gif)$/,
          use: [
            'file-loader',
          ],
      }
    ]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify(NODE_ENV)
      }
    }),

    new HtmlWebpackPlugin({
      template: helpers.root("client/public/index.html"),
      inject: "body"
    }),

    new ExtractTextPlugin({
      filename: "css/[name].[hash].css",
      disable: !isProd
    }),

    new CopyWebpackPlugin([
      {
        from: helpers.root("client/public")
      }
    ])
  ]
};
