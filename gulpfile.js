var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
var browserSync = require('browser-sync');

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    },
    https: true
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('default', ['sass','browser-sync'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
    gulp.watch("*.html", ['bs-reload']);
});
