var http = require('http');
var config = require('./config.json');
/**
 * Log in to moodle and get a session token
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
  moodleRequest.write('username=admin&password=Moodle123%21');
  moodleRequest.end();
}

/**
 * Express middleware function that makes sure the
 * user has a valid moodle session token
 * @param req
 * @param res
 * @param next
 */
//TODO
function isLoggedIn(req, res, next) {
//  res.statusCode = 422;
//  res.end(JSON.stringify({errors: {Auth: ['Access Denied']}}));
  next();
}

exports.login = login;
exports.isLoggedIn = isLoggedIn;
