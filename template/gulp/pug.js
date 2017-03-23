var gulp    = require('gulp'),
    gutil   = require('gulp-util'),
    data    = require('gulp-data'),
    pug     = require('gulp-pug'),
    path    = require('path'),
    _       = require('underscore'),
    config  = require('../config.js'),
    sitemap = require('./sitemap');

module.exports = function() {
  delete require.cache[path.resolve('../config.js')];
  delete require.cache[path.resolve('./sitemap.js')];

  gulp.src('./site/**/[^_]*.pug')
    .pipe(data(function(file) {
      var urlPath = sitemap.filePathToUrlPath(file.history[0].replace(file.base, ''));

      config.sitemap  = sitemap.generate();
      config = _.extend(config, sitemap.getPage(config.sitemap, urlPath));

      return config;
    }))
    .pipe(pug({
      basedir: path.resolve('./')
    }))
    .on('error', require('./error'))
    .pipe(gulp.dest('./build'));
};
