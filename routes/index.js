exports.index = function(req, res) {
  var title = 'Express.js + EJS + Bootstrap',
      httpResObj = {
          'directoryData': getAppData(),
          'cmdOutput': getDirectoryListing(),
          'hostname': getHostname()
      };
  console.log('Will be rendered by EJS: ' + JSON.stringify(httpResObj));
  res.render('index.ejs', {title: title, ejsObj: httpResObj});
};

exports.helloJson = function(req, res) {
  var err = null,
      httpResObj = {
          'parsedUriObj': getParsedUri(req),
          'backendServerHostname': getHostname()
      };
  console.log('Will be sent as JSON: ' + JSON.stringify(httpResObj));

  if(httpResObj.parsedUriObj.search) {
    err = 'Contrived error for demo. For some arbitrary reason, we are not ' +
        'allowing query strings when doing a JSON response.';
    res.status(400);
    res.render('error.ejs', {title: 'HTTP 400: bad request', error: err});
  } else {
    res.type('json');
    res.send(JSON.stringify(httpResObj));
  }
};

/**
 * getParsedUri() returns an object containing the full URI, incl. query string. 
 * See: - http://expressjs.com/en/api.html#req
 *      - http://devdocs.io/node~6_lts-url/
 */
function getParsedUri(req) {
  var url = require('url'),
      fullPath = req.originalUrl.split('?'),
      host = req.header('host').split(':'),
      uriObj = {
        'protocol': req.protocol,
        'slashes': true,
        'hostname': host[0],
        'port': host[1],
        'pathname': fullPath[0],
        'search': fullPath[1]
      };
  return uriObj;
}

/**
 * getAppData() reads from a JSON file. (This type of function would normally
 * retrieve data from a DB.)
 */
function getAppData() {
  var fs = require('fs');
      dirInfo = fs.readFileSync('./site-data/directory-structure.json');
  return JSON.parse(dirInfo);
}

/**
 * getDirectoryListing() issues an ls(1) shell command.
 *   NB:
 *   a) This would be better handled using Node.js's fs module, but I want to
 *      show off the child_process/exec capability.
 *   b) You generally want to use an async function for a shell command; this is
 *      just a simple, quick ls(1).
 */
function getDirectoryListing() {
  var exec = require('child_process').execSync,
      stdout = exec('/bin/ls', {'timeout': 5, 'encoding': 'utf8'});
  return stdout;
}

/**
 * getHostname() uses the OS module to: simply grab the hostname.
 */
function getHostname() {
  var os = require('os'),
      hostname = os.hostname();
  if(hostname) {
    return hostname;
  } else {
    return 'localhost';
  }
}
