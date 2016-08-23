let InventoryLogging = require('../models/inventory_logging')

module.exports = function inventory_logging_service(options) {

	this.add({role: 'inventory_logging', cmd: 'log_product_availability'}, function (msg, respond) {
		logger.info("Received event for logging product availability")

	    let productId = msg.productId;
	    let quantity = msg.quantity;
	    let warehouse = msg.warehouse;
	    let sessionId = msg.sessionId;

        

	    var response = {success: result}
	    respond(null, response);
  	});
}