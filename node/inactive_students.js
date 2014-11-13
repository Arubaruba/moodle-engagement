var Promise = require('bluebird');
var getDatabase = require('./get_database');
var loadSql = require('./load_sql');

var queries = {
  inactive_students: loadSql('inactive_students')
};
/**
 * Finds students in a moodle database that have not been active
 *
 * @param {Number} minInactiveTime
 *  The minimum time in milliseconds a student needs to have been inactive
 * @param {Number} maxInactiveTime
 *  The maximum time in milliseconds a student needs to have been inactive
 * @return {Promise} returns an array of objects containing student name, emailAddress and inactiveTime
 */
module.exports = function(minInactiveTime, maxInactiveTime) {
  return Promise.using(getDatabase(), function(db){
    return db.queryAsync(queries.inactive_students, [minInactiveTime, maxInactiveTime]);
  });
};
