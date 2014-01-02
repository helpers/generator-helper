

var expect = require('chai').expect;
var _ = require('lodash');

_.mixin(require('../'));

describe('<%= _.slugify(fullName) %>', function() {

	before(function(){
		// run any code before tests here
	});

  it('should do something awesome', function() {
    var expected = 'FOO';
    var actual = _.'<%= _.safename(helperName) %>'('foo');
    expect(actual).to.eql(expected);
  });

});