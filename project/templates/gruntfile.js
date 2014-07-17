'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

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
    verb: {
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

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-verb');

  grunt.registerTask('test', ['mochaTest']);
  grunt.registerTask('default', ['test', 'readme']);

};
