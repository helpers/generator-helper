'use strict';

var yo = require('yeoman-generator');
var slugify = require('slugify');
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
    var self = this;

    var prompts = [
      {
        type: 'list',
        name: 'type',
        message: 'type:',
        'default': 'Handlebars',
        choices: [
          'Handlebars',
          'lodash'
        ]
      },
      {
        name: 'name',
        message: 'name:'
      },
      {
        name: 'desc',
        message: 'description:'
      }
    ];

    this.prompt(prompts, function (answers) {
      for (var key in answers) {
        if (answers.hasOwnProperty(key)) {
          self[key] = answers[key];
        }
      };
            
      cb();
    }.bind(this));
  },
  
  config: function () {
    var type = this.type.toLowerCase();
    this.config.set('type', type);
    
    var name = slugify(this.name, '-');
    this.config.set('name', name);
    
    var desc = this.desc;
    this.config.set('desc', desc);
  },

  file: function () {
    var helperFileType = this.type.toLowerCase() + '.js';
    var helperFileName = this.name.toLowerCase() + '.js';
    this.template(helperFileType, helperFileName);
  }

});
