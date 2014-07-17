'use strict';

var gulp = require('gulp');
var help = require('gulp-help')(gulp);
var mocha = require('gulp-mocha');
var plumber = require('gulp-plumber');
var verb = require('gulp-verb');
var pkg = require('./package.json');

var opts = {
  src: {
    js: ['test/*.js', '*.js'],
    docs: '.verbrc.md',
    tests: 'test/*.js'
  },
  dest: './',
  jslint: {
    
  },
  mocha: {
    reporter: 'progress'
  },
  verb: {
    dest: 'README.md'
  }
};

// Run `gulp help` in the CLI to return a list of available tasks.
gulp.task('test', 'Run Mocha tests.', function () {
  gulp.src(opts.src.tests)
    .pipe(mocha(opts.mocha));
});
 
gulp.task('verb', 'Compile README.md using gulp-verb.', function () {
  gulp.src([opts.src.docs])
    .pipe(plumber())
    .pipe(verb(opts.verb))
    .pipe(gulp.dest(opts.dest));
});

gulp.task('watch', 'Watch source files for changes.', function () {
  gulp.watch(opts.src.js, ['test']);
  gulp.watch(opts.src.docs, ['verb']);
});

gulp.task('default',['test']);
