/**
 * Lodash Mixin: {{<%= _.slugify(name) %>}}
 * Copyright (c) <%= (new Date).getFullYear() %>
 */

var expect = require('chai').expect;
var _ = require('lodash');

_.mixin(require('../'));

describe('<%= _.slugify(name) %>', function() {

  before(function(){
    // run any code before tests here
  });

  it('should do something awesome', function() {
    var expected = 'FOO';
    var actual = _.<%= _.slugify(name) %>('foo');
    expect(actual).to.eql(expected);
  });

});
