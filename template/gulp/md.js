var gulp          = require('gulp'),
    gutil         = require('gulp-util'),
    path          = require('path'),
    config        = require('../config.js'),
    marked        = require('marked'),
    pug           = require('pug'),
    _             = require('underscore'),
    sitemap       = require('./sitemap'),
    textTransform = require('gulp-text-simple'),
    extReplace    = require('gulp-ext-replace');

var generatePage = function(string, options) {
  var content     = sitemap.parseMdMeta(string),
      template    = pug.compileFile('./site/_markdown.pug'),
      template404 = pug.compileFile('./site/404.pug'),
      urlPath     = sitemap.filePathToUrlPath(path.relative(path.resolve('./site'), options.sourcePath));

  config.sitemap  = sitemap.generate();
  config = _.extend(config, sitemap.getPage(config.sitemap, urlPath));

  if(content.meta.draft) {
    return template404(config);
  }
  else {
    config.content  = marked(content.markdown);
    return template(config);
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
