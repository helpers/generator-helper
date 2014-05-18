/**
 * Lodash Mixin: {{<%= _.slugify(fullName) %>}}
 * Copyright (c) <%= (new Date).getFullYear() %> <%= contributors %>
 * Licensed under the <%= licenseType %> License (<%= licenseType %>).
 */

// Export mixins
var mixins = module.exports = {};

/**
 * {{<%= _.slugify(helperName) %>}}
 */
mixins.<%= _.safename(helperName) %> = function(comment) {
  //
  // TODO: Change this mixin!!!
  //
  return comment.toUpperCase();
};
