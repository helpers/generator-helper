/**
 * Handlebars Helper: {{<%= _.slugify(name) %>}}
 * Copyright (c) <%= (new Date).getFullYear() %>
 */

module.exports.register = function (Handlebars, options, params) {

  'use strict';

  var assemble = params.assemble;
  var grunt = params.grunt;
  var opts = options || {};

  /**
   * {{<%= _.slugify(name) %>}}
   */
  Handlebars.registerHelper('<%= _.slugify(name) %>', function(comment, options) {

    //
    // TODO: Change this helper!!!
    //
    var tmpl = '<!-- Comment provided by the <%= _.slugify(name) %> helper: {{comment}} -->';
    return new Handlebars.SafeString(options.fn(tmpl, { comment: comment }));
    
  });

};
