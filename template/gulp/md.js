var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    path          = require('path'),
    config        = require('../config.js'),
    marked        = require('marked'),
    pug           = require('pug'),
    parseMdMeta   = require('./sitemap').parseMdMeta,
    textTransform = require('gulp-text-simple'),
    extReplace    = require('gulp-ext-replace');

var generatePage = function(string) {
  var content = parseMdMeta(string),
      template = pug.compileFile('./site/_markdown.pug'),
      template404 = pug.compileFile('./site/404.pug');

  if(content.meta.draft) {
    return template404();
  }
  else {
    return template({
      content:  marked(content.markdown),
      meta:     content.meta
    });
  }
};

var generatePageTransform = textTransform(generatePage);

module.exports = function() {
  delete require.cache[path.resolve('../config.js')];
  delete require.cache[path.resolve('./sitemap.js')];

  gulp.src('./site/**/[^_]*.md')
    .pipe(generatePageTransform())
    .pipe(extReplace('.html'))
    .on('error', require('./error'))
    .pipe(gulp.dest('./build'));
};
