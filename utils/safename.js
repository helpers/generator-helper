exports.safename = function (name, patterns) {
  var prefixes = [
    'helper', 
    'handlebars-helper', 
    'mixin',
    'assemble'
  ];
  var remove = _.unique(_.flatten(_.union([], prefixes, patterns || [])));
  var re = new RegExp('^(?:' + remove.join('|') + ')[-_]?');
  return name.replace(re, '').replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
};
