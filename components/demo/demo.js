/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([
  'angular',
  './demo-controller',
  './demo-service'
], function(angular, demoController, demoService) {

'use strict';

var module = angular.module('http-mediator-demo.demo', ['bedrock.alert']);

module.controller(demoController);
module.service(demoService);

return module.name;

});