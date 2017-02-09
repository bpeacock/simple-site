var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    jade  = require('gulp-jade'),
    path  = require('path');

module.exports = function() {
  delete require.cache[path.resolve('../config.js')];

  gulp.src('./site/**/[a-zA-Z0-9]*.jade')
    .pipe(jade({
      locals: require('../config.js')
    }))
    .on('error', require('./error'))
    .pipe(gulp.dest('./build'));
};
