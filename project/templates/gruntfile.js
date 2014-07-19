'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    <% if (mocha != false) { %>
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
    },<% } if (docs != false) { %>

    /**
     * Generate README file.
     */
    verb: {
      options: {
        
      },
      docs: {
        
      }
    }<% } %>

  });
  <% if (mocha != false) { %>
  grunt.loadNpmTasks('grunt-mocha-test');<% } if (docs != false) { %>
  grunt.loadNpmTasks('grunt-verb');<% } if (mocha != false) { %>

  grunt.registerTask('test', ['mochaTest']);<% } %>
  grunt.registerTask('default', [<% if (docs != false) { %>'verb'<% } else { %>''<% } %>]);

};
