var gulp = require('gulp');

module.exports = function() {
  gulp.src([
      './site/**/*.txt',
      './site/**/*.ico',
      './site/**/*.xml',
      './site/**/*.jpg',
      './site/**/*.png',
      './site/**/*.html',
      './site/**/*.css'
    ])
    .pipe(gulp.dest('./build'));
};
