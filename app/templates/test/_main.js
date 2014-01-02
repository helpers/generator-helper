

var expect = require('chai').expect;

var <%= _.safename(helperName) %> = require('../');

describe('<%= _.slugify(helperName) %>', function() {

	before(function(){
		// run any code before tests here
	});

  it('should do something awesome', function() {
    var expected = '<%= _.slugify(helperName) %>';
    var actual = '<%= _.slugify(helperName) %>';
    expect(actual).to.eql(expected);
  });

});