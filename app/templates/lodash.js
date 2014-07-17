/**
 * Lodash Mixin: {{<%= _.slugify(name) %>}}
 * Copyright (c) <%= (new Date).getFullYear() %>
 */

var mixins = module.exports = {};

/**
 * {{<%= _.slugify(name) %>}}
 */
mixins.<%= _.slugify(name) %> = function (comment) {
  //
  // TODO: Change this mixin!!!
  //
  return comment.toUpperCase();
};
