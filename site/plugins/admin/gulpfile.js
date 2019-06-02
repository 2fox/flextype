//
// Flextype Admin Gulp.js
// (c) Sergey Romanenko <http://romanenko.digital>
//

var Promise = require("es6-promise").Promise,
    gulp = require('gulp'),
    csso = require('gulp-csso'),
    concat = require('gulp-concat'),
    del = require('del'),
    runSequence = require('run-sequence'),
    sourcemaps = require('gulp-sourcemaps'),
    autoprefixer = require('gulp-autoprefixer'),
    sass = require('gulp-sass');

gulp.task('admin-css', function() {
    return gulp.src('assets/scss/admin.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(concat('admin.min.css'))
        .pipe(gulp.dest('assets/dist/css/'));
});

gulp.task('admin-light-css', function() {
    return gulp.src('assets/scss/admin-light.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(concat('admin-light.min.css'))
        .pipe(gulp.dest('assets/dist/css/'));
});

gulp.task('admin-css-clean', function() {
    return del('assets/dist/css/admin.min.css');
});

gulp.task('build-css', function(){
  return gulp.src(['node_modules/bootstrap/dist/css/bootstrap.min.css',
                   'node_modules/animate.css/animate.min.css',
                   'node_modules/codemirror/lib/codemirror.css',
                   'node_modules/messenger-hubspot/build/css/messenger.css',
                   'node_modules/messenger-hubspot/build/css/messenger-theme-flat.css',
                   'assets/dist/css/admin.min.css'])
       .pipe(autoprefixer({
           browsers: ['last 2 versions'],
           cascade: false
       }))
    .pipe(sourcemaps.init())
    .pipe(concat('admin-build.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/dist/css/'));
});

gulp.task('js', function(){
  return gulp.src(['node_modules/jquery/dist/jquery.min.js',
                   'node_modules/popper.js/dist/umd/popper.min.js',
                   'node_modules/bootstrap/dist/js/bootstrap.min.js',
                   'node_modules/codemirror/lib/codemirror.js',
                   'node_modules/codemirror/mode/htmlmixed/htmlmixed.js',
                   'node_modules/codemirror/mode/xml/xml.js',
                   'node_modules/codemirror/mode/javascript/javascript.js',
                   'node_modules/codemirror/mode/php/php.js',
                   'node_modules/codemirror/mode/clike/clike.js',
                   'node_modules/codemirror/mode/yaml/yaml.js',
                   'node_modules/messenger-hubspot/build/js/messenger.min.js',
                   'node_modules/messenger-hubspot/build/js/messenger-theme-flat.js',
                   'node_modules/clipboard/dist/clipboard.min.js',
                   'node_modules/bs-custom-file-input/dist/bs-custom-file-input.min.js'
                ])
    .pipe(sourcemaps.init())
    .pipe(concat('admin-build.min.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets/dist/js/'));
});

gulp.task('codemirror-theme-monokai', function(){
  return gulp.src(['node_modules/codemirror/theme/monokai.css'])
    .pipe(gulp.dest('assets/dist/css/'));
});

gulp.task('codemirror-theme-elegant', function(){
  return gulp.src(['node_modules/codemirror/theme/elegant.css'])
    .pipe(gulp.dest('assets/dist/css/'));
});

gulp.task('default', function(callback) {
  runSequence('admin-css',
                        ['build-css',
                        'js'],
              'admin-css-clean',
              'admin-light-css',
              'codemirror-theme-monokai',
              'codemirror-theme-elegant',
              callback);
});
