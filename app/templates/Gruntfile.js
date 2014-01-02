/*
 * <%= _.slugify(fullName) %>
 * <%= repositoryUrl %>
 *
 * Copyright (c) <%= (new Date).getYear() %> <%= contributors %>
 * Licensed under the <%= licenseType %> license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg : grunt.file.readJSON('package.json'),

    /**
     * Configure jshint to check our javascript files
     */
    jshint: {
      all: ['Gruntfile.js', 'test/*.js', '*.js'],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    /**
     * Run mocha tests.
     */
    mochaTest: {
      test: {
        options: {
          spawn: false,
          clearRequireCache: true,
          reporter: 'progress'
        },
        src: ['test/*.js']
      }
    },

    /**
     * Watch source files and run tests when changes are made.
     */
    watch: {
      dev: {
        files: ['Gruntfile.js', 'test/*.js', '*.js'],
        tasks: ['test']
      }
    },


    /**
     * Use helpers.json for context to generate list
     * of related repos
     */
    readme: {
      options: {
        boilerplate: 'node-util'
      }
    }

  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-readme');

  // Tests
  grunt.registerTask('test', ['jshint', 'mochaTest']);

  // Dev
  grunt.registerTask('dev', ['test', 'watch']);

  // Docs
  grunt.registerTask('docs', ['readme']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['test', 'readme']);

};