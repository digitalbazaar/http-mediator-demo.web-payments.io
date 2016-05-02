define([
  'angular',
  './demo/demo'
], function(angular, demoController) {

'use strict';

var module = angular.module('http-mediator-demo', []);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Welcome',
      templateUrl: requirejs.toUrl('http-mediator-demo/demo/demo.html')
    });
});

});
