/* eslint-env jasmine */
var fs = require('fs');
var path = require('path');
var MemoryFileSystem = require('memory-fs');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ThymeleafInjectPlugin = require('../');

var OUTPUT_DIR = path.join(__dirname, '../dist');

describe('ThymeleafInjectPlugin', function () {
  it('adds thymeleaf tags', function (done) {
    var expected = fs.readFileSync(path.resolve(__dirname, 'fixtures/expected.html')).toString();
    var compiler = webpack({
      entry: {
        main: path.join(__dirname, 'fixtures', 'entry.js')
      },
      output: {
        path: OUTPUT_DIR,
        filename: '[name].js'
      },
      plugins: [
        new HtmlWebpackPlugin(),
        new ThymeleafInjectPlugin()
      ]
    }, function (err, result) {
      expect(err).toBeFalsy();
      expect(JSON.stringify(result.compilation.errors)).toBe('[]');
      var html = result.compilation.assets['index.html'].source();
      expect(html).toBe(expected);
      done();
    });
    compiler.outputFileSystem = new MemoryFileSystem();
  });
});
