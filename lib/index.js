/*
 * Main module file for http-mediator-demo.web-payments.io.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');
var brExpress = require('bedrock-express');
require('bedrock-protractor');
require('bedrock-requirejs');
var brServer = require('bedrock-server');
require('bedrock-views');

require('./config');

var api = {};
module.exports = api;

// FIXME: Do HTTP-only for now to avoid having to buy and setup HTTPS certs
// TODO: Eventually use Let's Encrypt
// track when bedrock is ready to attach express
bedrock.events.on('bedrock.ready', function() {
  // attach express to regular http
  brServer.servers.http.on('request', brExpress.app);
});
