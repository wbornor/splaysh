var environment = process.env.NODE_ENV || 'development';
var debug = environment !== "production";
var path = require('path');
var webpack = require('webpack');

module.exports = {
    context: __dirname,
    devServer: !debug ? null : {
        inline: true,
        hot: true,
        port: 3000
    },
    devtool: debug ? "source-map" : null,
    entry: "./web/js/index.js",
    output: {
        path: __dirname,
        filename: "dist/bundle.js",
    },
    module: {
        noParse: [
            /aws\-sdk/,
        ],
        loaders: [{
            test: /\.js$/,
            loaders: ['babel'],
            exclude: [/node_modules/,/aws\-sdk/]
        }]
    },
    plugins: debug ? [] : [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.optimize.DedupePlugin(),
            new webpack.optimize.OccurenceOrderPlugin(),
            new webpack.optimize.UglifyJsPlugin({mangle: false, sourcemap: false}),
        ]
};
