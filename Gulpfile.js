var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  handlebars = require('gulp-handlebars'),
  wrap = require('gulp-wrap'),
  declare = require('gulp-declare'),
  livereload = require('gulp-livereload'),
  minifyCSS = require('gulp-minify-css'),
  gutil = require('gulp-util'),
  sourcemaps = require('gulp-sourcemaps'),

  eventStream = require('event-stream'),
  packageName = require('./package.json')['name'];

var buildPaths = {
  temp: './tmp',
  production: 'dist'
};

gulp.task('local-scripts', function () {
  gulp.src([
    'app/app.js',
    'app/**/*.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat(packageName + '.local-scripts.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildPaths.temp))
    .pipe(livereload())
});


gulp.task('dependencies', function () {
  gulp.src([
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/handlebars/handlebars.min.js',
    'bower_components/ember/ember.min.js',
    'bower_components/ember-data/ember-data.min.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat(packageName + '.dependencies.js'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(buildPaths.temp));
});

gulp.task('templates', function () {
  gulp.src([
    'app/templates/**/*.hbs'
  ])
    .pipe(handlebars({
      handlebars: require('ember-handlebars')
    }).on('error', gutil.log))
    .pipe(wrap('Ember.Handlebars.template(<%= contents %>)'))
    .pipe(declare({
      namespace: 'Ember.TEMPLATES',
      noRedeclare: true
    }))
    .pipe(uglify())
    .pipe(concat(packageName + '.templates.js'))
    .pipe(gulp.dest(buildPaths.temp))
    .pipe(livereload());
});

gulp.task('sass', function () {
  return eventStream.merge(
    gulp.src('bower_components/skeleton/stylesheets/skeleton.css'),
    gulp.src('app/**/*.scss').pipe(sass().on('error', gutil.log))
  ).pipe(concat(packageName + '.css')).pipe(minifyCSS())
    .pipe(gulp.dest(buildPaths.temp))
    .pipe(livereload());
});

gulp.task('default', function () {
  gulp.start(['local-scripts', 'dependencies', 'templates', 'sass']);
  livereload.listen();

  gulp.watch('app/**/*.js', ['local-scripts']);
  gulp.watch('app/**/*.hbs', ['templates']);
  gulp.watch('app/**/*.scss', ['sass']);
});
