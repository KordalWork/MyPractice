const { src, dest, watch, parallel } = require('gulp');

const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();

function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'src/'
    }
  });
}


function styles() {
  return src('src/sass/style.sass')
      .pipe(sass({outputStyle: 'compressed'}))
      .pipe(concat('style.min.css'))
      .pipe(autoprefixer({
        overrideBrowserslist: ['last 10 version'],
        grid: true
      }))
      .pipe(dest('src/css'))
      .pipe(browserSync.stream())
}

function watching() {
  watch(['src/sass/**/*.sass'], styles);
  watch(['src/*html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;

exports.default = parallel(browsersync, watching);