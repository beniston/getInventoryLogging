'use strict'
var inventory_logging_service = require("./src/services/inventory_logging_service.js")
global.logger = require("./src/helpers/logger")

var seneca = require("seneca")()
seneca.use(inventory_logging_service)

seneca.act('role:web', {
  use: {
    prefix: '/api/inventory_logging/',
    pin: { role: 'inventory_logging', cmd: '*' },
    map: {
      log_product_availability: { POST: true, GET: true }
      //get_product_availability: { POST: true, GET: true }
    }
  }
});

var express = require('express')
var app = express()
app.use(require("body-parser").json())
app.use(seneca.export('web'))

app.listen(3000)
logger.info("Started the shopping_cart_handler_ms in port 3000")