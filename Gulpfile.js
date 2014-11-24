var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass'),
  uglify = require('gulp-uglify'),
  handlebars = require('gulp-handlebars'),
  order = require('gulp-order'),
  wrap = require('gulp-wrap'),
  declare = require('gulp-declare'),
  livereload = require('gulp-livereload'),
  minifyCSS = require('gulp-minify-css'),
  gutil = require('gulp-util'),

  eventStream = require('event-stream'),
  packageName = require('./package.json')['name'];

var buildPaths = {
  development: './tmp',
  production: 'dist'
};

var pipes = {
  localScripts: function () {
    return gulp.src([
      'app/app.js',
      'app/**/*.js'
    ])
      .pipe(uglify())
      .pipe(concat(packageName + '.local-scripts.js'));
  },
  dependencies: function () {
    return gulp.src([
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/handlebars/handlebars.min.js',
      'bower_components/ember/ember.min.js',
      'bower_components/ember-data/ember-data.min.js'
    ])
      .pipe(concat(packageName + '.dependencies.js'));
  },
  templates: function () {
    return gulp.src([
      'app/**/*.hbs'
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
      .pipe(concat(packageName + '.templates.js'));
  },
  sass: function () {
    return eventStream.merge(
      gulp.src('bower_components/skeleton/stylesheets/*.css'),
      gulp.src('app/**/*.scss').pipe(sass().on('error', gutil.log))
    ).pipe(concat(packageName + '.css')).pipe(minifyCSS());
  }
};

gulp.task('default', function () {
  livereload.listen();

  eventStream.merge(
    pipes.dependencies(),
    pipes.localScripts(),
    pipes.templates(),
    pipes.sass()
  ).pipe(gulp.dest(buildPaths.development));

  gulp.watch('app/**/*.js', function () {
    pipes.localScripts()
      .pipe(gulp.dest(buildPaths.development))
      .pipe(livereload())
      .on('error', gutil.log);
  });

  gulp.watch('app/**/*.hbs', function () {
    pipes.templates()
      .pipe(gulp.dest(buildPaths.development))
      .pipe(livereload())
      .on('error', gutil.log);
  });

  gulp.watch('app/**/*.scss', function () {
    pipes.sass()
      .pipe(gulp.dest(buildPaths.development))
      .pipe(livereload())
      .on('error', gutil.log);
  });
});

gulp.task('production', function () {
  eventStream.merge(
    pipes.dependencies(),
    pipes.templates(),
    pipes.localScripts()
  )
    .pipe(order(['*dependencies*', '*templates*', '*local-scripts*']))
    .pipe(concat(packageName + '.min.js'))
    .pipe(gulp.dest(buildPaths.production));

  pipes.sass().pipe(gulp.dest(buildPaths.production));
});
