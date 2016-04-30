/*
 * http-mediator-demo.http-mediator-demo.web-payments.io test configuration.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

// location of logs
var _logdir = '/tmp/http-mediator-demo.web-payments.io';

// 0 means use # of cpus
config.core.workers = 0;
config.core.restartWorkers = true;

// logging
config.loggers.logdir = _logdir;
config.loggers.app.filename = _logdir + '/http-mediator-demo.web-payments.io-test-app.log';
config.loggers.access.filename = _logdir + '/http-mediator-demo.web-payments.io-test-access.log';
config.loggers.error.filename = _logdir + '/http-mediator-demo.web-payments.io-test-error.log';

// only log critical errors by default
config.loggers.console.level = 'critical';

// server info
config.server.port = 54443;
config.server.httpPort = 54080;
config.server.host = 'http-mediator-demo.web-payments.dev:54443';
config.server.baseUri = 'https://' + config.server.host;

// views
// branding
config.views.brand.name = 'Payment App Demo Test';
// update view vars
config.views.vars.baseUri = config.server.baseUri;
config.views.vars.title = config.views.brand.name;
config.views.vars.siteTitle = config.views.brand.name;

// add protractor tests
var protractor = config.protractor.config;
protractor.suites['http-mediator-demo.web-payments.io'] = path.join(
  __dirname, '..', 'tests', 'protractor', 'tests', '**', '*.js');
var prepare = path.join(__dirname, '..', 'tests', 'protractor', 'prepare.js');
protractor.params.config.onPrepare.push(prepare);
protractor.params.config.maxTimeout = 30000;
