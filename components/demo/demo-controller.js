/*!
 * Copyright (c) 2016 Digital Bazaar, Inc. All rights reserved.
 */
define([], function() {

'use strict';

/* @ngInject */
function factory($location, $scope, hmdDemoService, config, brAlertService) {
  var self = this;

  self.paymentApp = false;
  self.paymentRequest = false;
  self.paymentResponse = false;
  self.enablePurchasing = false;
  self.paymentSuccessful = false;

  var paymentRequestUrl = config.data.payments.paymentRequestUrl;

  self.registerPaymentApp = function() {
    hmdDemoService.getPaymentApp(function(req, res) {
      self.registrationRawRequest = req;
      self.registrationRawResponse = res;
    }).then(function(response) {
      self.paymentApp = response.data;
      self.enablePurchasing = true;
    }, function(err) {
      console.log('Register Payment App error:', err);
    });
  };

  self.performPurchase = function() {
    // attempt to access the resource being purchased
    hmdDemoService.accessTargetPurchase(function(req, res) {
      self.accessTargetPurchaseRawRequest = req;
      self.accessTargetPurchaseRawResponse = res;
      // FIXME: Angular's $http service destroys headers on 402s
      self.accessTargetPurchaseRawResponse += "location: " + paymentRequestUrl;
    }).then(function(response) {
      console.log("Requesting access should fail with 402 Payment Required");
    }, function(err) {
      // get the payment request from the merchant
      hmdDemoService.getPaymentRequest(paymentRequestUrl, function(req, res) {
        self.paymentRequestRawRequest = req;
        self.paymentRequestRawResponse = res;
      }).then(function(response) {
        self.paymentRequest = response.data;
        // process the payment request via the payment app
        hmdDemoService.postPaymentRequest(
          self.paymentApp.paymentRequestService, self.paymentRequest,
          function(req, res) {
          self.paymentRequestPostRawRequest = req;
          self.paymentRequestPostRawResponse = res;
        }).then(function(response) {
          self.paymentResponse = response.data;
          // send the payment response to the merchant
          hmdDemoService.postPaymentResponse(
            self.paymentRequest, self.paymentResponse, function(req, res) {
            self.paymentResponsePostRawRequest = req;
            self.paymentResponsePostRawResponse =
              'HTTP/1.1 302\n' +
              'set-cookie: moviePass=6ac9557ec1c15cb6d668fd9419f8fb2f;\n' +
              'location: ' + config.data.payments.targetPurchaseUrl + '\n';
          }).then(function(response) {
            console.log('XMLHttpRequest should refuse to redirect...');
          }, function(err) {
            self.paymentSuccessful = true;
          });
        }, function(err) {
          console.log('Post PaymentRequest error:', err);
        });

      }, function(err) {
        console.log('Get PaymentRequest error:', err);
      });
    });
  };
}

return {hmdDemoController: factory};

});