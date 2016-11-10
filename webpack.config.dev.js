'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        'data-source.test': ['./test/data-source'],
        'grid.example': ['./examples/grid'],
        'grid.test': ['./test/grid'],
        'panel-container.test': ['./test/panel-container']
    },
    module: {
        loaders: [
            { loader: 'ts-loader', test: /\.tsx?$/ }
        ]
    },
    output: {
        filename: '[name].js',
        path: './dist'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('production')
        }),
        new webpack.DllReferencePlugin({
            context: '.',
            manifest: require("./dist/vendors-manifest.json")
        })],
    resolve: {
        alias: {
            'react$': path.resolve(__dirname, './node_modules/react/dist/react-with-addons'),
            'react-dom$': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom'),
            'react-addons-test-utils$': path.resolve(__dirname, './node_modules/react-addons-test-utils/index'),
            'sinon': 'sinon/pkg/sinon'
        },
        extensions: ['', '.js', '.json', '.ts', '.tsx']
    },
    resolveLoader: {
        modulesDirectories: ['./node_modules']
    }
}