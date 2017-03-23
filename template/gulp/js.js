var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    transform   = require('vinyl-transform'),
    browserify  = require('browserify');

module.exports = function() {
  return gulp.src('./site/**/[a-zA-Z0-9]*.js')
    .pipe(transform(function(filename) {
      return browserify(filename, {
        insertGlobals: true,
        debug: true
      })
        .bundle();
    }))
    .on('error', require('./error'))
    .pipe(gulp.dest('./build'));
};
