'use strict';

var yo = require('yeoman-generator');
var util = require('util');
var path = require('path');
var _ = require('lodash');

var safename = require('../utils/safename.js');
var processTemplate = require('../utils/processTemplate.js');

module.exports = yo.generators.Base.extend({
  
  init: function () {
    this._.mixin({ 'safename': safename });
  },

  askFor: function () {
    var cb = this.async();
    
    var prompts = [
      {
        name: 'name',
        message: 'name:',
        'default': this.config.get('name')
      },
      {
        name: 'description',
        message: 'description:',
        'default': this.config.get('desc')
      },
      {
        name: 'url',
        message: 'url:'
      },
      {
        name: 'license',
        message: 'license',
        'default': 'MIT'
      },
      {
        name: 'author',
        message: 'author'
      },
      {
        type: 'list',
        name: 'taskrunner',
        message: 'build system:',
        choices: [
          'gulp',
          'grunt'
        ]
      },
      {
        type: 'conform',
        name: 'docs',
        message: 'Generate boilerplate documentation? (y/n)',
      }
    ];

    this.prompt(prompts, function (answers) {

      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          var self = this;
          self[key] = answers[key];
        }
      }

      cb();
    }.bind(this));
  },

  files: function () {
    this.type = this.config.get('type');
    
    this.template('package.json', 'package.json');
    var taskrunnerName = this.taskrunner.toLowerCase() + 'file.js';
    this.copy(taskrunnerName, taskrunnerName);
  },

  docs: function () {
    if (this.docs != false) {
      this.mkdir('docs');
      this.template('verbrc.md','.verbrc.md');
    }
  }
  
});
