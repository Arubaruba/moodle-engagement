var fs = require('fs');

module.exports = function(filePath) {
  return fs.readFileSync(__dirname + '/sql/' + filePath + '.sql', {encoding: 'utf8'});
};