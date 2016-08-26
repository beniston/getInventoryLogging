'use strict'
var postgre = require('../helpers/postgreSQL')
var objPost = new postgre()

module.exports = function inventory_logging_service(options) {

	this.add({ role: 'inventory_logging', cmd: 'log_product_availability' }, function (msg, respond) {
		logger.info("Received event for logging product availability")
		var obj = {};
		obj.eventName = 'AddItem'
		obj.productId = 21309
		obj.sessionId = '12345'
		obj.jsonstring = '"warehouse":"nc","quantity":10'

		objPost.logInventoryDetails.call(objPost, obj)
		var response = { success: true }
		respond(null, response)
	});
}