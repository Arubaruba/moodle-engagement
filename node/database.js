var Promise = require('bluebird');
var mysql = require('mysql');
var credentials = require('./mysql_credentials.json');
var fs = require('fs');
var config = require('./config.json');

var pool = Promise.promisifyAll(mysql.createPool(credentials));

function loadQuery(file) {
  return fs.readFileSync('./sql/' + file + '.sql', {encoding: 'utf8'});
}

function getConnection() {
  return pool.getConnectionAsync().then(function(db){
    return Promise.promisifyAll(db);
  }).disposer(function(db) {
    db.release();
  });
}

function addToRequest(req, res, next) {
  Promise.using(getConnection(), function (db) {
    req.db = db;
    next();
  });
}

exports.loadQuery = loadQuery;
exports.getConnection = getConnection;
exports.addToRequest = addToRequest;
