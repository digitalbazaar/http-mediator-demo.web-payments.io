/*
 * http-mediator-demo.web-payments.io production configuration.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var config = require('bedrock').config;
var path = require('path');

// location of configuration files
var _cfgdir = path.join(__dirname, '..');

// location of logs
var _logdir = '/var/log/http-mediator-demo.web-payments.io';

// core configuration
config.core.workers = 1;
config.core.worker.restart = true;

// master process while starting
config.core.starting.groupId = 'adm';
config.core.starting.userId = 'root';

// master and workers after starting
config.core.running.groupId = 'webpayments';
config.core.running.userId = 'webpayments';

// logging
config.loggers.logdir = _logdir;
config.loggers.app.filename = path.join(_logdir, 'http-mediator-demo.web-payments.io-app.log');
config.loggers.access.filename = path.join(
  _logdir, 'http-mediator-demo.web-payments.io-access.log');
config.loggers.error.filename = path.join(
  _logdir, 'http-mediator-demo.web-payments.io-error.log');
config.loggers.email.silent = true;
config.loggers.app.bedrock.enableChownDir = true;
config.loggers.access.bedrock.enableChownDir = true;
config.loggers.error.bedrock.enableChownDir = true;

// server info
config.server.port = 443;
config.server.httpPort = 80;
config.server.bindAddr = ['http-mediator-demo.web-payments.io'];
config.server.domain = 'http-mediator-demo.web-payments.io';
config.server.host = 'http-mediator-demo.web-payments.io';
config.server.baseUri = 'http://' + config.server.host;
//config.server.key = path.join(_cfgdir, 'pki', 'http-mediator-demo.web-payments.io.key');
//config.server.cert = path.join(_cfgdir, 'pki', 'http-mediator-demo.web-payments.io.crt');
//config.server.ca = path.join(_cfgdir, 'pki', 'http-mediator-demo.web-payments.io-bundle.crt');

// session info
config.express.session.key = 'http-mediator-demo.web-payments.io.sid';
config.express.session.prefix = 'http-mediator-demo.web-payments.io.';

// view variables
config.views.brand.name = 'Payment Mediator';
config.views.vars.baseUri = config.server.baseUri;
config.views.vars.title = config.views.brand.name;
config.views.vars.siteTitle = config.views.brand.name;
config.views.vars.supportDomain = config.server.domain;
config.views.vars.style.brand.alt = config.views.brand.name;
config.views.vars.minify = true;

// http-mediator-demo.web-payments.io config
config.views.vars['payments'] = {};
config.views.vars.payments.registerPaymentAppUrl =
  'http://payment-app-demo.web-payments.io/apps';
config.views.vars.payments.targetPurchaseUrl =
  'http://merchant-demo.web-payments.io/movies/dr-strangelove';
config.views.vars.payments.paymentRequestUrl =
  'http://merchant-demo.web-payments.io/movies/dr-strangelove/requests';

require('./http-mediator-demo.web-payments.io-secrets');
