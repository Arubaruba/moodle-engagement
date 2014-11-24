var Promise = require('bluebird');
var express = require('express');
var path = require('path');
var database = require('./database');
var authentication = require('./authentication');
var app = express();

// Add database access to the request (req) variable
//app.use('/data', database.addToRequest);
// Make sure the user is logged in if they want to access the RESTful service
app.use('/data', authentication.isLoggedIn);

// The login path
app.get('/login', authentication.login);

app.get('/data/students', function (req, res) {
  res.json({students: [{}]});
  //req.db.queryAsync('SELECT `firstname` as `firstName`, `lastname` as `lastName`, `email`, `lastlogin` as `lastLogin` FROM mdl_user WHERE `lastlogin` > 0').then(function(result) {
  //  res.json({students: result[0]});
  //});
});

/**
 * Static files are served
 */
app.use(express.static(path.resolve(__dirname, '../app')));
app.use('/tmp', express.static(path.resolve(__dirname, '../tmp')));

app.listen(3030);
