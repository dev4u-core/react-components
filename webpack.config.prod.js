'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    //devtool: 'source-map',
    entry: {
        'data-source.test': ['./test/data-source'],
        'grid.test': ['./test/grid'],
        'panel-container.test': ['./test/panel-container']
    },
    externals: {
        // 'react': 'React',
        // 'react-dom': 'ReactDOM'
        'cheerio': 'window',
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true
    },
    frameworks: ['chai', 'mocha'],
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
        new webpack.optimize.CommonsChunkPlugin({
            children: false,
            minChunks: 2,
            name: 'vendors'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'NODE_ENV': JSON.stringify('production')
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