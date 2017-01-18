module.exports = function (config) {
  config.set({
    autoWatch: true,
    browsers: ['Chrome'/*'PhantomJS'*/],
    files: ['./dist/vendors.js', './dist/tests/components/*.test.js', './dist/tests/infrastructure/*.test.js'],
    frameworks: ['mocha'],
    plugins: ['karma-chrome-launcher', 'karma-mocha', 'karma-mocha-reporter'/*, 'karma-phantomjs-launcher'*/],
    reporters: ['mocha'],
    singleRun: false
  });
};