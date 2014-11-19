var Promise = require('bluebird');
var mysql = require('mysql');
var credentials = require('./mysql_credentials.json');

var pool = Promise.promisifyAll(mysql.createPool(credentials));

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

exports.getConnection = getConnection;
exports.addToRequest = addToRequest;
