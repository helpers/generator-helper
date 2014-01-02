'use strict';
var yeoman = require('yeoman-generator');
var async = require('async');
var util = require('util');
var path = require('path');
var _ = require('lodash');

var safename = function (name, patterns) {
  var prefixes = ['grunt', 'helper', 'handlebars-helper', 'mixin', 'assemble-contrib', 'assemble'];
  var remove = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
  var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
}


var HelperGenerator = module.exports = function HelperGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));

  this._.mixin({ 'safename': safename });
};

util.inherits(HelperGenerator, yeoman.generators.Base);

HelperGenerator.prototype.askFor = function askFor() {
  var cb = this.async();
  var self = this;

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var promptsList = [
    [
      {
        name: 'helperName',
        message: 'What do you want to call your helper?'
      },
      {
        name: 'description',
        message: 'How would you describe this helper?'
      },
      {
        name: 'user',
        message: 'What user/org will this helper live under?'
      }
    ], [
      {
        name: 'homepage',
        message: 'What is the homepage for this helper?',
        'default': 'https://github.com/<%= user %>/<%= _.slugify(helperName) %>'
      },
      {
        name: 'repositoryUrl',
        message: 'Where will this helper be stored?',
        'default': 'https://github.com/<%= user %>/<%= _.slugify(helperName) %>.git'
      },
      {
        name: 'bugUrl',
        message: 'Where can people submit bugs for this helper?',
        'default': 'https://github.com/<%= user %>/<%= _.slugify(helperName) %>/issues'
      }
    ], [
      {
        name: 'licenseType',
        message: 'What type of license does this helper have?',
        'default': 'MIT'
      }
    ], [
      {
        name: 'licenseUrl',
        message: 'Where can the license be found?',
        'default': 'https://github.com/<%= user %>/<%= _.slugify(helperName) %>/blob/master/LICENSE-<%= licenseType %>'
      },
      {
        name: 'contributors',
        message: 'Who are the contributors on this helper?',
        'default': '<%= user %>'
      }
    ]
  ];

  async.eachSeries(promptsList, function(prompts, next) {

    // process any templates
    prompts.forEach(function(prompt) {
      prompt.message = self._.template(prompt.message, self);
      prompt['default'] = self._.template(prompt['default'], self);
    });

    // prompt for answers
    self.prompt(prompts, function(answers) {
      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          self[key] = answers[key];
        }
      }

      next(null);
    });

  },
  function(err) {
    if(err) {
      console.log('Error: ', err);
      return cb(err);
    }

    // calculated answers
    self.repositoryType = 'git';
    cb();
  });

};

/**
 * Setup any configuration files that have to do with package manangers.
 * eg: package.json, bower.json
 * @return {undefined}
 */
HelperGenerator.prototype.packageManagerConfigs = function packageManagerConfigs() {
  this.template('_package.json', 'package.json');
  this.template('_bower.json', 'bower.json');
};

/**
 * Setup any configuration files that have to do with the project
 * eg: editor settings, development settings (jshint, gruntfile)
 * @return {[type]} [description]
 */
HelperGenerator.prototype.projectConfigs = function projectConfigs() {
  this.copy('editorconfig', '.editorconfig');
  this.copy('jshintrc', '.jshintrc');
  this.copy('gitignore', '.gitignore');
  this.copy('npmignore', '.npmignore');
  this.copy('LICENSE-MIT', 'LICENSE-MIT');
  this.template('Gruntfile.js', 'Gruntfile.js');
};

HelperGenerator.prototype.testSetup = function testSetup() {
    this.mkdir('test');
    this.template('test/_main.js', 'test/main.js');
};

HelperGenerator.prototype.docsSetup = function docsSetup() {
  this.mkdir('docs');
};

HelperGenerator.prototype.helperFiles = function helperFiles() {
  this.template('_index.js', 'index.js');
};