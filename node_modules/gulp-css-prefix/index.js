'use strict';

var cssPrefix = require('css-prefix');
var PluginError = require('gulp-util').PluginError;
var through2 = require('through2');
var VinylBufferStream = require('vinyl-bufferstream');

module.exports = function gulpCssPrefix(options) {

  if('object' === typeof options){
    // don't require a prefix, but don't require *not* giving a prefix
    if(!options.prefix){
      options.prefix = '';
    }
  }

  return through2.obj(function modifyContents(file, enc, cb) {
    var run = new VinylBufferStream(function(buf, done) {

      done(
        null,
        new Buffer(
          cssPrefix(
            options,
            String(buf)
          )
        )
      );

    });

    var self = this;

    run(file, function(err, contents) {
      if (err) {
        self.emit('error', new PluginError('gulp-css-prefix', err, {fileName: file.path}));
      } else {
        file.contents = contents;
        self.push(file);
      }
      cb();
    });
  });
};
