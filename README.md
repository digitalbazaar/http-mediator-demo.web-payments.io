# HTTP Payment Mediator Demo

A demonstration site for a W3C Web Payments Payment Mediator that uses the
HTTP-API.

A live version and demo of this site can be found at [http-mediator-demo.web-payments.io][].

# Core Functionality

This software enables a person to:

* Register a payment application.
* Route payment requests from merchants to payment apps.
* Route payment responses from payment apps to merchants.

# Development

The following section explains how to setup and develop the
http-mediator-demo.web-payments.io software on a local development machine.

### Requirements

* node.js
* npm

### Configuration

The options in the `./configs/http-mediator-demo.web-payments.dev.js` file can
be tuned to your environment as needed.

## Setup

* Install the dependencies by running `npm install`
* Map the `http-mediator-demo.web-payments.dev` hostname to your localhost.
  (for example, edit `/etc/hosts`) to map `http-mediator-demo.web-payments.dev`
  to `localhost`).

### Running

Run the following to start up a development server from the source directory:

    node http-mediator-demo.webpayments.dev.js

To add more verbose debugging, use the `--log-level` option:

    node http-mediator-demo.webpayments.dev.js --log-level debug

### Usage

Access the server at the following URL:

* http://http-mediator-demo.webpayments.dev.js:54080/

[http-mediator-demo.web-payments.io]: https://http-mediator-demo.web-payments.io/
