/**
 * Handlebars Helper: {{<%= _.slugify(fullName) %>}}
 * Copyright (c) <%= (new Date).getYear() %> <%= contributors %>
 * Licensed under the <%= licenseType %> License (<%= licenseType %>).
 */

// Export helpers
module.exports.register = function (Handlebars, options, params) {

  'use strict';

  var assemble = params.assemble;
  var grunt = params.grunt;
  var opts = options || {};

  /**
   * {{<%= _.slugify(helperName) %>}}
   */
  Handlebars.registerHelper('<%= _.slugify(helperName) %>', function(comment, options) {

    //
    // TODO: Change this helper!!!
    // 
    var tmpl = '<!-- Comment provided by the <%= _.slugify(helperName) %> helper: {{comment}} -->';
    return new Handlebars.SafeString(options.fn(tmpl, { comment: comment }));
  });

};