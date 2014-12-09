var http = require('http');
var config = require('./config.json');
var cookieParser = require('cookie-parser');
/**
 * Get a moodle session token for the user
 * @param req
 * @returns {boolean}
 */
function login(req, res) {
  var moodleRequest = http.request({
    hostname: config['moodleHost'],
    method: 'POST',
    path: config['moodlePath'] + '/login/index.php',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }, function (moodleResponse) {
    // Get the newest session token - the last MoodleSession cookie
    var session;
    moodleResponse.headers['set-cookie'].forEach(function(currentValue) {
      var match = currentValue.match(/MoodleSession=(\w+)/);
      if (match) session = match[1];
    });
    // If the user failed to login they will still get a token - a guest token.
    // Delete the guest token while using the Delete to check for it's existence
    req.db.queryAsync('DELETE FROM mdl_sessions WHERE sid = ? AND userid = 0', [session]).then(function(result) {
      if (result[0].affectedRows !== 0) {
        res.statusCode = 403;
        res.end();
      } else {
        res.end(session);
      }
    });
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

function isLoggedIn(req, res, next) {
  var authToken = req.headers['moodle_token'];
  req.db.queryAsync('SELECT userid FROM `mdl_sessions` WHERE sid = ?' +
  ' AND NOT FROM_UNIXTIME(timemodified) < DATE_SUB(now(), INTERVAL 20 MINUTE) LIMIT 1', [authToken]).then(function (results) {
    if (results[0].length == 0) {
      res.statusCode = 422;
      res.end('not_logged_in');
    } else {
      req.db.queryAsync('UPDATE mdl_sessions SET `timemodified` = ? WHERE sid = ?;', [Date.now() / 1000, authToken]);
      req.userId = results[0][0].userid;
      next();
    }
  });
}

exports.login = login;
exports.isLoggedIn = isLoggedIn;
