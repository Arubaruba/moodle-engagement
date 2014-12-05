var Promise = require('bluebird');
var express = require('express');
var path = require('path');
var database = require('./database');
var authentication = require('./authentication');
var app = express();

// Add database access to the request (req) variable
app.use('/data', database.addToRequest);
// Make sure the user is logged in if they want to access the RESTful service
app.use('/data', authentication.isLoggedIn);

// The login path
app.get('/login', authentication.login);

var studentsQuery = database.loadQuery('students');
app.get('/data/students', function (req, res) {
  req.db.queryAsync(studentsQuery, [req.user, req.query.class, req.query.class]).then(function (result) {
    res.json({students: result[0]});
  });
});

var classesQuery = database.loadQuery('classes');
app.get('/data/classes', function (req, res) {
  req.db.queryAsync(classesQuery, [req.user]).then(function (result) {
    res.json({classes: result[0]});
  });
});

/**
 * Static files are served
 */
app.use(express.static(path.resolve(__dirname, '../app')));
app.use('/tmp', express.static(path.resolve(__dirname, '../tmp')));

app.listen(3030);
