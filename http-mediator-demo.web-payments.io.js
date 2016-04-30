/*
 * http-mediator-demo.web-payments.io production server starter.
 *
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
var bedrock = require('bedrock');

require('./lib');
require('./configs/http-mediator-demo.web-payments.io');

bedrock.start();
