'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
    cache: true,
    entry: {
        'components/grid.test': ['./tests/components/grid'],
        'components/panel-container.test': ['./tests/components/panel-container'],
        'infrastructure/comparer.test': ['./tests/infrastructure/comparer'],
        'infrastructure/data-source.test': ['./tests/infrastructure/data-source'],
        'infrastructure/data-source-pager.test': ['./tests/infrastructure/data-source-pager']
    },
    module: {
        loaders: [
            { loader: 'ts-loader', test: /\.tsx?$/ }
        ]
    },
    output: {
        filename: '[name].js',
        path: './dist/tests'
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