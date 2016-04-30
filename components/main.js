define([
  'angular'
], function(angular) {

'use strict';

var module = angular.module('http-mediator-demo', []);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'HTTP Payment Mediator Demo',
      templateUrl: requirejs.toUrl('http-mediator-demo/landingPage.html')
    });
});

});
