var express = require('express');
var app = express();
var sendReminderEmail = require('./send_reminder_email');
var inactiveStudents = require('./inactive_students');

app.get('/', function(request, response) {
  response.end('ok');
});

//app.listen(3030);
//sendReminderEmail('andreas@stockers.org', '5 weeks');
function daysToMilliseconds(days) {
  return 1000 * 60 * 60 * 24 * days;
}
inactiveStudents(daysToMilliseconds(7), daysToMilliseconds(6 * 30)).then(function(students) {
  console.log(students[0]);
});