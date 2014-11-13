var Promise = require('bluebird');
var mysql = require('mysql');

var pool = Promise.promisifyAll(mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'moodle'
}));

module.exports = function() {
  return pool.getConnectionAsync().then(function(db){
    return Promise.promisifyAll(db);
  }).disposer(function(db) {
    db.release();
  });
};
