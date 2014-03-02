/*
 * grunt-readme
 * https://github.com/assemble/generator-helper
 *
 * Copyright (c) 2014 Brian Woodward, contributors
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: ['Gruntfile.js', 'app/*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-readme');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'readme']);

};
