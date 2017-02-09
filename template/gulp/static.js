var gulp = require('gulp');

module.exports = function() {
  gulp.src(['./site/**/*.txt', './site/**/*.ico', './site/**/*.xml'])
    .pipe(gulp.dest('./build'));
};
