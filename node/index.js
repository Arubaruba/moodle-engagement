var Promise = require('bluebird');
var express = require('express');
var path = require('path');
var database = require('./database');
var authentication = require('./authentication');
var config = require('./config.json');
var app = express();

// Add database access to the request (req) variable
app.use('/data', database.addToRequest);
// Make sure the user is logged in if they want to access the RESTful service
app.use('/data', authentication.isLoggedIn);

// The login path
app.get('/login', authentication.login);

app.get('/data/students', function (req, res) {
  //WHERE `lastlogin` > 0
  var indicatorQuery = Object.keys(config.indicators).map(function(name) {
    var query = config.indicators[name];
    return '(' + query + ') as `' + name + '`';
  }).join(', ');
  req.db.queryAsync('SELECT `id`, `firstname` as `firstName`, `lastname` as `lastName`, `email`, ' + indicatorQuery + ' FROM mdl_user ').then(function(result) {
    res.json({students: result[0]});
  });

  req.db.queryAsync('SELECT (SELECT COUNT(*) FROM `mdl_user_enrolments` WHERE `userid` = mdl_user.id) as `course_count`, id FROM `mdl_user` WHERE 1').then(function(result) {
    console.log(result[0]);
  });
});

// find courses teacher is teaching -> get students taking those courses ->
// find courses user is taking -> find assignment count for that course -> find their submissions
// mdl_user_enrolments            mdl_assign                               mdl_assign_submission

/**
 * Static files are served
 */
app.use(express.static(path.resolve(__dirname, '../app')));
app.use('/tmp', express.static(path.resolve(__dirname, '../tmp')));

app.listen(3030);
