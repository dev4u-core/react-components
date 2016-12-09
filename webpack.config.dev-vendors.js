'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        'vendors': ['chai', 'enzyme', 'react'],
    },
    externals: {
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    frameworks: ['chai', 'mocha'],
    output: {
        filename: 'vendors.js',
        library: 'vendors',
        path: './dist'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DllPlugin({
            context: '.',
            path: path.join(__dirname, 'dist', '[name]-manifest.json'),
            name: 'vendors'
        })],
    resolve: {
        alias: {
            'react$': path.resolve(__dirname, './node_modules/react/dist/react-with-addons'),
            'react-dom$': path.resolve(__dirname, './node_modules/react-dom/dist/react-dom'),
            'react-addons-test-utils$': path.resolve(__dirname, './node_modules/react-addons-test-utils/index'),
            'sinon': 'sinon/pkg/sinon'
        },
        extensions: ['', '.js', '.json']
    },
    resolveLoader: {
        modulesDirectories: ['./node_modules']
    }
}