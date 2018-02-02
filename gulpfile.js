var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var ecstatic = require('ecstatic');
var http = require('http');
var browserSync = require('browser-sync').create();

var paths = {
  scss: ['scss/main.scss'],
  css: 'css/'
};

gulp.task('serve', function(){
  http.createServer(
    ecstatic({ root: __dirname })
  ).listen(8000);

  console.log('Listening on :8000');
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('build-sass', function() {
  return gulp.src(paths.scss)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write(''))
    .pipe(gulp.dest(paths.css))
    .pipe(browserSync.stream());
});

gulp.task('watch', function() {
  gulp.watch('scss/**/*.scss', ['build-sass']);
  gulp.watch('*.html').on('change', browserSync.reload);
});

gulp.task('default', ['watch', 'build-sass', 'serve', 'browser-sync']);

