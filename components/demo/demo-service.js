/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define(['angular'], function(angular) {

'use strict';

/* @ngInject */
function factory(config, $http) {
  var self = this;

  // appends a transform to a list of $http transforms
  function appendTransform(defaults, transform) {
    // no guarantee that the default transformation is an array
    defaults = angular.isArray(defaults) ? defaults : [defaults];
    // append the new transformation to the defaults
    return defaults.concat(transform);
  }

  // attempt to recreate as much of a raw HTTP request and response as possible
  function httpTrace(method, url, data, rawDataCallback) {
    var rawRequest = undefined;
    var rawResponse = undefined;
    var request = {
      url: url,
      method: method,
      transformRequest: appendTransform($http.defaults.transformRequest,
        function(data, headers) {
          // record as much of the raw request as possible
          rawRequest = method +' '+ url +'\n';
          var allHeaders = headers();
          for(var header in allHeaders) {
            rawRequest += header + ': ' + allHeaders[header] +'\n';
          }
          if(data) {
            rawRequest += '\n' + JSON.stringify(JSON.parse(data), null, 2);
          }
          rawDataCallback(rawRequest, rawResponse);
      }),
      transformResponse: appendTransform($http.defaults.transformResponse,
        function(data, headers, status, statusText) {
          // record as much of the raw response as possible
          rawResponse = 'HTTP/1.1 ' + status +'\n';
          var allHeaders = headers();
          for(var header in allHeaders) {
            rawResponse += header + ': ' + allHeaders[header] +'\n';
          }
          rawResponse += '\n';

          if(data) {
            rawResponse += JSON.stringify(data, null, 2);
          }
          rawDataCallback(rawRequest, rawResponse);

          return data;
      })
    };

    // add post data if it exists
    if(data) {
      request.data = data;
    }

    return $http(request);
  }

  self.getPaymentApp = function(rawDataCallback) {
    var registerPaymentAppUrl = config.data.payments.registerPaymentAppUrl;
    return httpTrace('GET', registerPaymentAppUrl, null, rawDataCallback);
  };

  self.accessTargetPurchase = function(rawDataCallback) {
    var targetPurchaseUrl = config.data.payments.targetPurchaseUrl;
    return httpTrace('GET', targetPurchaseUrl, null, rawDataCallback);
  };

  self.getPaymentRequest = function(url, rawDataCallback) {
    return httpTrace('GET', url, null, rawDataCallback);
  };

  self.postPaymentRequest = function(
    paymentApp, paymentRequest, rawDataCallback) {
    return httpTrace('POST', paymentApp, paymentRequest, rawDataCallback);
  };

  self.postPaymentResponse = function(
    paymentRequest, paymentResponse, rawDataCallback) {
    return httpTrace('POST', paymentRequest.paymentCompleteService,
      paymentResponse, rawDataCallback);
  };
}

return {hmdDemoService: factory};

});