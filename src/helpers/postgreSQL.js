'use strict'
var Sequelize = require('sequelize')
var ServiceDiscoverer = require('./service_discoverer')
var services = new ServiceDiscoverer()
var http = require('http')
var sequelize_conf;
const sqlQuery = 'INSERT INTO RTI_WebGetInventoryLog(InvokingEvent,ProductID,LegacyInventoryResult,GetInventoryResult) VALUES ($1, $2, $3, $4) RETURNING LogID'

var PostgreSQL = module.exports = function () {
    sequelize_conf = services.getSequalizeConfig()
}

PostgreSQL.prototype.logInventoryDetails = function (obj) {
    var self = this
    sequelize_conf.authenticate().then(function (err) {
        logger.info('Connection success..')
        GetInventoryDetails(obj.productId,self.logInventoryfromGetInventoryService(obj));
    }).catch(function (err) {
        logger.info('Error : ' + err);
    });
}

PostgreSQL.prototype.logInventoryfromGetInventoryService = function (obj) {
    return function (result) {
        logger.info(obj);
        logger.info(result.reply);
        logger.info(result.error);
        sequelize_conf.query(sqlQuery, { bind: [obj.eventName, obj.productId, obj.jsonstring,result.reply], type: Sequelize.QueryTypes.INSERT }).then(function (err, result) {
            if (err) {
                logger.info(err);
            } else {
                logger.info('row inserted with id: ' + result.rows[0].LogID);
            }
        });
    }
}

function GetInventoryDetails(productId, callback) {
    logger.info(productId);
    return http.get({
        host: '10.100.2.72',
        port: '4000',
        path: '/ms/getinventory?productId=' + productId
    }, function (response) {
        var body = '';
        response.on('data', function (d) {
            body += d;
        });
        response.on('end', function () {
            // Data reception is done, do whatever with it!
            var parsed = JSON.parse(body);
            logger.info(parsed);
            callback({
                reply: parsed.reply,
                error: parsed.error
            });
        });
    });

}
