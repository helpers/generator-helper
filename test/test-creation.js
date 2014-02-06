/*global describe, beforeEach, it*/
'use strict';

var path    = require('path');
var helpers = require('yeoman-generator').test;

describe('helper generator', function () {

  beforeEach(function (done) {
    helpers.testDirectory(path.join(__dirname, 'temp'), function (err) {
      if (err) {
        return done(err);
      }

      this.app = helpers.createGenerator('helper:app', [
        '../../app'
      ]);
      done();
    }.bind(this));
  });

  it('creates expected files', function (done) {
    var expected = [
      // add files you expect to exist here.
      '.jshintrc',
      '.editorconfig',
      '.gitignore',
      'LICENSE-MIT',
      'package.json',
      'bower.json',
      'package.json',
      'package.json',
      'Gruntfile.js',
      'test/main.js',
      'index.js'
    ];

    helpers.mockPrompt(this.app, {
      helperType: 'Handlebars',
      helperName: 'myHelper',
      fullName: 'myHelper-helper-myHelper',
      description: 'The best helper ever',
      user: 'assemble',
      homepage: 'https://github.com/assemble/myHelper-helper-myHelper',
      repositoryUrl: 'https://github.com/assemble/myHelper-helper-myHelper.git',
      bugUrl: 'https://github.com/assemble/myHelper-helper-myHelper/issues',
      licenseType: 'MIT',
      licenseUrl: 'https://github.com/assemble/myHelper-helper-myHelper/blob/master/LICENSE-MIT',
      contributors: 'assemble'
    });

    this.app.options['skip-install'] = true;

    this.app.run({}, function () {
      helpers.assertFile(expected);
      done();
    });

  });

});
