'use strict';

// ---------------------------------------------------------------------------
//                  GLOBAL VARIABLE DEFINITION
// ---------------------------------------------------------------------------

const crypto = require('crypto');
const fs = require('fs');
const process = require('process');

const HTTPCONF = './site-config/http-server.json';
const FILEDESC = './model/file-descriptions.json';

// ---------------------------------------------------------------------------
//                  EXPORTED FUNCTIONS
// ---------------------------------------------------------------------------

exports.getHttpServerConfig = function() {
  let json = fs.readFileSync(HTTPCONF);
  return JSON.parse(json);
};

exports.getFileDescriptions = function() {
  let json = fs.readFileSync(FILEDESC);
  return JSON.parse(json);
};

exports.getCiphers = function() {
  return crypto.getCiphers();
};

exports.getMemUsage = function() {
  return process.memoryUsage();
};
