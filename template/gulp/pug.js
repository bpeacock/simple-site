var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    pug  = require('gulp-pug'),
    path  = require('path'),
    config = require('../config.js');

module.exports = function() {
  delete require.cache[path.resolve('../config.js')];
  delete require.cache[path.resolve('./sitemap.js')];

  gulp.src('./site/**/[^_]*.pug')
    .pipe(pug({
      data: config,
      basedir: path.resolve('./')
    }))
    .on('error', require('./error'))
    .pipe(gulp.dest('./build'));
};
