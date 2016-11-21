// -------------------------------------------------------------------------
// Variable definitions
// -------------------------------------------------------------------------
var express = require('express'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    routes = require('./routes'),
    http = require('http'),
    path = require('path'),
    fs = require('fs'),
    helmet = require('helmet');

// -------------------------------------------------------------------------
// Listener settings sucked in from config file
// -------------------------------------------------------------------------
var httpListener = fs.readFileSync(path.join(__dirname, 'site-config',
        'http-server.json')),
    httpListener = JSON.parse(httpListener);

// -------------------------------------------------------------------------
// HTTP server setup
// -------------------------------------------------------------------------
var app = express(),
    server;

if(httpListener.requireTls) {
  var https = require('https'),
      sslOptions = {
          key: fs.readFileSync(httpListener.tlsKey),
          cert: fs.readFileSync(httpListener.tlsCert),
          ca: fs.readFileSync(httpListener.tlsCaCert),
          secureProtocol: 'TLSv1_method'
      },
      server = https.createServer(sslOptions, app);
} else {
  var http = require('http'),
  server = http.createServer(app);
}

// -------------------------------------------------------------------------
// Express configuration
// -------------------------------------------------------------------------
app.use(helmet());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'bower_components')));

app.use(morgan('combined'));

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// -------------------------------------------------------------------------
// Express routes
// -------------------------------------------------------------------------
app.get('/', routes.index);
app.get('/hello', routes.helloJson);

// -------------------------------------------------------------------------
// Express error handling
// -------------------------------------------------------------------------
// Handle HTTP 404 if we didn't match any of the routes above
app.use(function(req, res) {
  res.status(404);
  res.render('error.ejs', {title: 'HTTP 404: not found'});
});

// Handle HTTP 500 if we hit an application error
app.use(function(err, req, res, next) {
  res.status(500);
  res.render('error.ejs', {title: 'HTTP 500: internal error',
      error: err});
});

// -------------------------------------------------------------------------
// Start the Express HTTP server
// -------------------------------------------------------------------------
server.listen(httpListener.port, httpListener.ip, function(){
    console.log('HTTP server listening. Settings: ' + JSON.stringify(httpListener));
});
