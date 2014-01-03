/**
 * Handlebars Helper: {{<%= _.slugify(fullName) %>}}
 * Copyright (c) <%= (new Date).getFullYear() %> <%= contributors %>
 * Licensed under the <%= licenseType %> License (<%= licenseType %>).
 */

var expect = require('chai').expect;

var <%= _.safename(fullName) %> = require('../');

describe('<%= _.slugify(fullName) %>', function() {

	before(function(){
		// run any code before tests here
	});

  it('should do something awesome', function() {
    var expected = '<%= _.slugify(fullName) %>';
    var actual = '<%= _.slugify(fullName) %>';
    expect(actual).to.eql(expected);
  });

});