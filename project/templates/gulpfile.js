'use strict';

var gulp = require('gulp');
var help = require('gulp-help')(gulp);
<% if (mocha != false) { %>var mocha = require('gulp-mocha');<% } %>
var plumber = require('gulp-plumber');
<% if (docs != false) { %>var verb = require('gulp-verb');<% } %>
var pkg = require('./package.json');

var opts = {
  src: {
    <% if (docs != false) { %>docs: '.verbrc.md'<% } %>
    <% if (mocha != false) { %>, tests: 'test/*.js'<% } %>
  },
  dest: './',
  <% if (mocha != false) { %>
  mocha: {
    reporter: 'progress'
  },<% } if (docs != false) { %
  verb: {
    dest: 'README.md'
  }<% } %>
};

// Run `gulp help` in the CLI to return a list of available tasks.
<% if(mocha != false){ %>
gulp.task('test', 'Run Mocha tests.', function () {
  gulp.src(opts.src.tests)
    .pipe(mocha(opts.mocha));
});
<% } %>
    
<% if(docs != false) { %>
gulp.task('verb', 'Compile README.', function () {
gulp.src([opts.src.docs])
  .pipe(plumber())
  .pipe(verb(opts.verb))
  .pipe(gulp.dest(opts.dest));
});
<% } %>

gulp.task('watch', 'Watch source files for changes.', function () {
  <% if (mocha != false) { %>
    gulp.watch(opts.src.js, ['test']);
  <% } if (docs != false) { %>
  gulp.watch(opts.src.docs, ['verb']);
  <% } %>
});

gulp.task('default',['watch']);
