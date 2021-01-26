const { src, dest, watch } = require('gulp');

const scss = require('gulp-sass');
const concat = require('gulp-concat');



function styles() {
  return src('src/scss/style.scss')
      .pipe(scss({outputStyle: 'compressed'}))
      .pipe(concat('style.min.css'))
      .pipe(dest('src/css'))
}

function watching() {
  watch(['src/scss/**/*.scss'], styles);
}

exports.styles = styles;
exports.watching = watching;