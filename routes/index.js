'use strict';

// ---------------------------------------------------------------------------
//                  GLOBAL VARIABLE DEFINITION
// ---------------------------------------------------------------------------

const f = require('../functions');

// ---------------------------------------------------------------------------
//                  EXPORTED FUNCTIONS
// ---------------------------------------------------------------------------

exports.index = function(req, res) {
  let title = 'Express.js + EJS + Bootstrap';
  let o = {
    directoryData: f.getFileDescriptions(),
    supportedCiphers: f.getCiphers(),
  };
  // The o object is handed over to EJS with the key/name 'esjObj'
  res.render('index.ejs', {title: title, ejsObj: o});
};

exports.helloJson = function(req, res) {
  let o = {
    memUseInBytes: f.getMemUsage(),
  };
  res.json(o);
};
