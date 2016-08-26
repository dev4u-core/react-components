'use strict';

var path = require('path');

module.exports = {
    entry: {
        'data-source.test': ['./test/data-source'],
        'grid.example': ['./example/grid'],
        'grid.test': ['./test/grid'],
        'panel-container.example': ['./example/panel-container'],
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
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ],
        noParse: [/node_modules\/sinon\//]
    },
    output: {
        filename: '[name].js',
        path: './dist'
    },
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