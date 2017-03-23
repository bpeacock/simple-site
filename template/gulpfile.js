var gulp  = require('gulp'),
    watch = require('gulp-watch'),
    webserver = require('gulp-webserver');

gulp.task('pug',    require('./gulp/pug'));
gulp.task('md',     require('./gulp/md'));
gulp.task('css',    require('./gulp/css'));
gulp.task('js',     require('./gulp/js'));
gulp.task('static', require('./gulp/static'));

gulp.task('default', ['pug', 'md', 'css', 'js', 'static']);

gulp.task('serve', function() {
  watch(['site/**/*', 'components/**/*', 'config.js', 'config.less'], function() {
    gulp.start('default');
  });

  gulp.src('build')
    .pipe(webserver({
      livereload: true,
      open: true,
      fallback: '404.html'
    }));
});
