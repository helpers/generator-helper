'use strict';
var yeoman = require('yeoman-generator');
var util = require('util');
var path = require('path');
var _ = require('lodash');

var safename = function (name, patterns) {
  var prefixes = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'assemble-contrib', 'assemble'];
  var remove = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
  var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
};

var processTemplate = function(tmpl) {
  return function(answers) {
    return this._.template(tmpl, answers);
  };
};

var HelperGenerator = yeoman.generators.Base.extend({
  init: function () {
    this.pkg = require('../package.json');
    this.description = this.pkg.description;

    this.on('end', function () {
      this.installDependencies({ skipInstall: this.options['skip-install'] });
    });

    this._.mixin({ 'safename': safename });
  },

  askFor: function () {
    var cb = this.async();
    var self = this;

    if (!this.options['skip-welcome-message']) {
      console.log(this.yeoman);
    }

    var prompts = [
      {
        type: 'list',
        name: 'helperType',
        message: 'What type of helper are you creating?',
        'default': 'Handlebars',
        choices: [
          'Handlebars',
          'lodash'
        ]
      },
      {
        name: 'helperName',
        message: 'What do you want to call your helper?',
        'default': 'myHelper'
      },
      {
        name: 'fullName',
        message: 'What will the full name be?',
        'default': processTemplate('<%= _.slugify(helperType) %>-<%= (helperType === "lodash" ? "mixin" : "helper") %>-<%= _.slugify(helperName) %>').bind(self)
      },
      {
        name: 'description',
        message: 'How would you describe your helper?'
      },
      {
        name: 'user',
        message: 'What user or organization will your helper live under?'
      },
      {
        name: 'homepage',
        message: 'What is the homepage for your helper?',
        'default': processTemplate('https://github.com/<%= user %>/<%= _.slugify(fullName) %>').bind(self)
      },
      {
        name: 'repositoryUrl',
        message: 'Where will your helper be stored?',
        'default': processTemplate('https://github.com/<%= user %>/<%= _.slugify(fullName) %>.git').bind(self)
      },
      {
        name: 'bugUrl',
        message: 'Where can people submit bugs for your helper?',
        'default': processTemplate('https://github.com/<%= user %>/<%= _.slugify(fullName) %>/issues').bind(self)
      },
      {
        name: 'licenseType',
        message: 'What type of license does your helper have?',
        'default': 'MIT'
      },
      {
        name: 'licenseUrl',
        message: 'Where can the license be found?',
        'default': processTemplate('https://github.com/<%= user %>/<%= _.slugify(fullName) %>/blob/master/LICENSE').bind(self)
      },
      {
        name: 'contributors',
        message: 'Who are the contributors on your helper?',
        'default': processTemplate('<%= user %>').bind(self)
      }, 
      {
        type: 'confirm',
        name: 'editorconfig',
        message: 'Would you like an .editorconfig file?' ,
        'default': false
      },
      {
        type: 'confirm',
        name: 'bower',
        message: 'Will this project require Bower?',
        'default': false
      },
      {
        type: 'list',
        name: 'buildType',
        message: 'Would you like to use gulp or Grunt as your build tool?',
        'default': 'gulp',
        choices: [
          'gulp',
          'Grunt'
        ]
      }
    ];

    this.prompt(prompts, function (answers) {

      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          self[key] = answers[key];
        }
      }

      // calculated answers
      self.repositoryType = 'git';

      cb();
    }.bind(this));
  },

  /**
   * Setup any configuration files that have to do with package manangers.
   * eg: bower.json and package.json
   * @return {undefined}
   */
  packageManagerConfigs: function () {
    if (this.editorconfig === true) this.template('_bower.json', 'bower.json');
    this.copy('_package.json', 'package.json');
  },

  /**
   * Setup any configuration files that have to do with the project
   * eg: editor settings, development settings (jshint, gruntfile)
   * @return {[type]} [description]
   */
  projectConfigs: function () {
    if (this.editorconfig === true) this.copy('editorconfig', '.editorconfig');
    this.copy('jshintrc', '.jshintrc');
    this.copy('verbrc', '.verbrc.md');
    this.copy('gitignore', '.gitignore');
    this.copy('npmignore', '.npmignore');
    this.copy('LICENSE', 'LICENSE');
  },
  
  /** 
   * Setup the build system
   * eg: gulp or grunt
   */
  projectBuildType: function () { 
    var filename = this.buildType.toLowerCase() + 'file.js';
    this.copy(filename,filename); // Copy either gruntfile.js or gulpfile.js
  },

  testSetup: function () {
    var mainName = 'test/_' + this.helperType.toLowerCase() + '.js';
    this.mkdir('test');
    this.template(mainName, 'test/main.js');
  },

  docsSetup: function () {
    this.mkdir('docs');
  },

  helperFiles: function () {
    var indexName = '_' + this.helperType.toLowerCase() + '.js';
    this.template(indexName, 'index.js');
  }

});

module.exports = HelperGenerator;
