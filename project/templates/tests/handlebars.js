/**
 * Handlebars Helper: {{<%= _.slugify(name) %>}}
 * Copyright (c) <%= (new Date).getFullYear() %>
 */

var expect = require('chai').expect;

var <%= _.slugify(name) %> = require('../');

describe('<%= _.slugify(name) %>', function() {

  before(function(){
    // run any code before tests here
  });

  it('should do something awesome', function() {
    var expected = '<%= _.slugify(name) %>';
    var actual = '<%= _.slugify(name) %>';
    expect(actual).to.eql(expected);
  });

});
