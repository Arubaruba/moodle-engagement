var handlebars = require('handlebars');
var fs = require('fs');

var emailTemplate = handlebars.compile(fs.readFileSync(__dirname +
  '/template/reminder_email.hbs', {encoding: 'utf8'}));
/**
 *
 * @param {String} emailAddress The Student's Email Address
 * @param {String} inactivityPeriod A number followed by a unit of time ex: '1 week'
 */
module.exports = function(emailAddress, inactivityPeriod) {
  console.log(emailTemplate({time: inactivityPeriod}));
};