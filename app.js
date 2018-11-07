'use strict';

// ---------------------------------------------------------------------------
//                  GLOBAL VARIABLE DEFINITION
// ---------------------------------------------------------------------------

const f = require('./functions');
const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const http = require('http');
const path = require('path');

// ---------------------------------------------------------------------------
//                  HTTP SERVER SETUP
// ---------------------------------------------------------------------------

const httpListener = f.getHttpServerConfig();
const app = express();
const server = http.createServer(app);

// Configure Express to use EJS templates
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Use the morgan module for logging
app.use(morgan('combined'));

// ---------------------------------------------------------------------------
//                  EXPRESS ROUTES
// ---------------------------------------------------------------------------

app.get('/', routes.index);
app.get('/hello', routes.helloJson);

// Handle page (i.e. route) not found
app.use((req, res) => {
  res.status(404);
  res.render('error.ejs', {title: 'HTTP 404: not found'});
});

// Handle uncaught exceptions
app.use((err, req, res, next) => {
  res.status(500);
  res.render('error.ejs', {title: 'HTTP 500: internal error', error: err});
});

// ---------------------------------------------------------------------------
//                  START HTTP SERVER
// ---------------------------------------------------------------------------

server.listen(httpListener.port, httpListener.ip, () => {
  console.log('HTTP server ready. Settings:');
  console.dir(httpListener);
});
