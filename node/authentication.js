var http = require('http');
var config = require('./config.json');
/**
 * Get a moodle session token for the user
 * @param req
 * @returns {boolean}
 */
function login(req, res, next) {
  var moodleRequest = http.request({
    hostname: config['moodleHost'],
    method: 'POST',
    path: config['moodlePath'] + '/login/index.php',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, function (moodleResponse) {
    res.json([moodleResponse.statusCode, moodleResponse.headers['set-cookie']]);
  });
  moodleRequest.write('username=' + encodeURIComponent(req.query.username) + '&password=' + encodeURIComponent(req.query.password));
  moodleRequest.end();
}

/**
 * Check if the user has a valid moodle session token
 * and if the user does not, Ember should catch this exact error and redirect to the login page.
 *
 * This also provides the user id in the req object as 'req.user'.
 */

//TODO SET TIMEMODIFIED TO CURRENT TIME IF TOKEN EXISTS
function isLoggedIn(req, res, next) {
  req.db.queryAsync('SELECT userid FROM `mdl_sessions` WHERE sid = ?' +
  ' AND NOT FROM_UNIXTIME(timemodified) < DATE_SUB(now(), INTERVAL 20 MINUTE) LIMIT 1', [req.headers.moodleToken]).then(function (results) {
    if (results[0].length == 0) {
      res.statusCode = 422;
      res.end('not_logged_in');
    } else {
      req.user = results[0].userid;
      next();
    }
  });
}

exports.login = login;
exports.isLoggedIn = isLoggedIn;
