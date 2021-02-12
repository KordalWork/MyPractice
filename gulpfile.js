const { src, dest, watch, parallel } = require('gulp');

const sass         = require('gulp-sass');
const concat       = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const browserSync  = require('browser-sync').create();
const imagemin     = require('gulp-imagemin');

function browsersync() {
  browserSync.init({
    server : {
      baseDir: 'src/'
    }
  });
}

function images() {
  return src('src/img/**/*')
    .pipe(imagemin(
      [
        imagemin.gifsicle({interlaced: true}),
        imagemin.mozjpeg({quality: 75, progressive: true}),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]
    ))
    .pipe(dest('dist/img'))
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

function build() {
  return src([
    'src/css/style.min.css',
    'src/fonts/**/*',
    'src/js/main.js',
    'src/*.html'
  ], {base: 'src'})
    .pipe(dest('dist'))
}

function watching() {
  watch(['src/sass/**/*.sass'], styles);
  watch(['src/*html']).on('change', browserSync.reload);
}

exports.styles = styles;
exports.watching = watching;
exports.browsersync = browsersync;
exports.build = build;
exports.images = images;

exports.default = parallel(browsersync, watching);