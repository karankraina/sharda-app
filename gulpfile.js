/* GULP TASKS */

/* These are the required packages needed to carry out the Gulp Task Below. */
const gulp = require('gulp');
const source = require('vinyl-source-stream');
const browserify = require('browserify');
const babel = require('gulp-babel');
const imagemin = require('gulp-imagemin');
const sass = require('gulp-sass');
const uglify = require('gulp-uglify');
const cleanCSS = require('gulp-clean-css');
const pump = require('pump');

/*  -----------------------  */

/* BABEL TASKS  */


/*  These compily the server controllers from ES6 to ES5 and puts the relevant
    files in the lib/server-controllers/ */
gulp.task('babelify-server-controllers', () => {
  return gulp.src('src/server-controllers/**/*.js').pipe(babel({
    presets: ['@babel/preset-env'],
  })).pipe(gulp.dest('lib/server-controllers/'));
});

/*  These compily the routes from ES6 to ES5 and puts the relevant
    files in the lib/routes/ */
gulp.task('babelify-routes', () => {
  return gulp.src('src/routes/**/*.js').pipe(babel({
    presets: ['@babel/preset-env'],
  })).pipe(gulp.dest('lib/routes/'));
});
/*  -----------------------  */

/*  These compily the routes from ES6 to ES5 and puts the relevant
    files in the lib/routes/ */
gulp.task('babelify-js-vendor', () => {
  return gulp.src(['src/public/vendor/js/**/*.js', '!src/public/vendor/js/general/*.js']).pipe(babel({
    presets: ['@babel/preset-env'],
  })).pipe(gulp.dest('lib/public/vendor/js'));
});
gulp.task('babelify-js-general-vendor', () => {
  return gulp.src('src/public/vendor/js/general/*.js')
    .pipe(gulp.dest('lib/public/vendor/js/general'));
});
/*  -----------------------  */

/* BROWSERIFY TASKS  */



/*  -----------------------  */

/* IMAGE COMPRESSION TASKS  */

/*  This task compresses all images from the src directory into the lib directory.
    If no compression is possible it simply copies the file from src to lib. */
gulp.task('image', () => {
  return gulp.src('./src/public/img/*')
    // .pipe(imagemin())
    .pipe(gulp.dest('lib/public/img/'));
});

/*  -----------------------  */

/* SASS TASKS  */

/*  This task complies SASS/CSS to CSS and outputs a single .css file into the lib folder.
    directory. */
gulp.task('sass', () => {
  return gulp.src('./src/public/scss/*.*css')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./lib/public/css'));
});


/* Minify Tasks TASK */

/*  The purpose of this task is to minify any vendor JavaScript code that the
    project uses. */
// gulp.task('minify-js-vendor', () => {
//   return gulp.src('src/public/vendor/js/**/*.js')
//     .pipe(gulp.dest('lib/public/vendor/js'));
// });

/*  The purpose of this task is to minify CSS code that the project uses. */
gulp.task('minify-css-vendor', () => {
  return gulp.src('src/public/vendor/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8',
    }))
    .pipe(gulp.dest('lib/public/vendor/css'));
});

/*  The purpose of this task is to minify any user-built JavaScript code that the
    project uses. */
gulp.task('minify-js', () => {
  pump([
    gulp.src('src/public/js/*.js'),
    uglify(),
    gulp.dest('lib/public/js'),
  ]);
});


/*  -----------------------  */

/* DEFAULT TASK */

/*  This is the default task and watches any folder / file which changes.
    The structure goes: ([Folders / Files to Watch], [Gulp Task]) */
gulp.task('watch', () => {
  gulp.watch('./src/server-controllers/**/*.js', gulp.series('babelify-server-controllers'));
  gulp.watch('./src/routes/**/*.js', gulp.series('babelify-routes'));
  gulp.watch('./src/public/scss/**/*.scss', gulp.series('sass'));
  gulp.watch('./src/public/img/*', gulp.series('image'));
  gulp.watch('./src/public/js/*.js', gulp.series('minify-js'));
  gulp.watch('./src/public/vendor/js/**/*.js', gulp.series('babelify-js-vendor'));
  gulp.watch('./src/public/vendor/css/**/*.css', gulp.series('minify-css-vendor'));
});

gulp.task('build', gulp.series('babelify-server-controllers', 'babelify-routes', 'image', 'sass', 'babelify-js-vendor', 'babelify-js-general-vendor', 'minify-css-vendor'));
/*  -----------------------  */

/* START TASK */

// Make my default task to watch both folders
gulp.task('default', gulp.series('build', 'watch'));

/*  -----------------------  */
