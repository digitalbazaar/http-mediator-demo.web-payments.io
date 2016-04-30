define([
  'angular'
], function(angular) {

'use strict';

var module = angular.module('http-mediator-demo', []);

/* @ngInject */
module.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      title: 'Welcome',
      templateUrl: requirejs.toUrl('http-mediator-demo/landingPage.html')
    });
});

});
