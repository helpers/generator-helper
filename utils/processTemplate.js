module.exports = function (tmpl) {
  return function(answers) {
    return this._.template(tmpl, answers);
  };
};
