var Promise = require('bluebird');
var express = require('express');
var path = require('path');
var database = require('./database');
var authentication = require('./authentication');
var app = express();

// Add database access to the request (req) variable
app.use(database.addToRequest);

// The login path
app.get('/login', authentication.login);

// Make sure the user is logged in if they want to access the RESTful service
app.use('/data', authentication.isLoggedIn);

var studentsQuery = database.loadQuery('students');
app.get('/data/students', function (req, res) {
  console.log(req.query);
  req.db.queryAsync(studentsQuery, [req.userId, req.query.course, req.query.course]).then(function (result) {
    var students = result[0];
    students.forEach(function (student) {
      student.courses = student.course_list.split(',');
      delete student.course_list;
    });

    // Fake Data
    //var students = [];
    //for (var i = 0; i < 1000; i++) {
    //  students.push({id: i +"", firstName: "Student"+i, lastName: "", daysSinceActive: 3, score: 100});
    //}

    res.json({students: students});
    console.log(students);
  });
});

var coursesQuery = database.loadQuery('courses');
app.get('/data/courses/$id', function (req, res) {
  req.db.queryAsync(coursesQuery, [req.params.id]).then(function (result) {
    res.json({courses: result[0]});
  });
});

/**
 * Static files are served
 */
app.use(express.static(path.resolve(__dirname, '../app')));
app.use('/tmp', express.static(path.resolve(__dirname, '../tmp')));

app.listen(3030);
