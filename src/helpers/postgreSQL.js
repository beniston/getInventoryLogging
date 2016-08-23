var Sequelize = require('sequelize')
var ServiceDiscoverer = require('./service_discoverer');
var services = new ServiceDiscoverer();

function postgreSQL() {
    this.sequelize_conf = services.getSequalizeConfig()
}

postgreSQL.prototype.openConnection = function (callbackfunction) {
    sequelize_conf.authenticate().then(function (err) {
        console.log('Connection success..')
        if (callbackfunction) {
            callbackfunction(true);
        }
    }).catch(function (err) {
        console.log('Error : ' + err)
        if (callbackfunction) {
            callbackfunction(false);
        }
    })
}

let sqlQuery = 'INSERT INTO RTI_WebGetInventoryLog(InvokingEvent,ProductID,LegacyInventoryResult,GetInventoryResult) VALUES ($1, $2, $3, $4) RETURNING LogID'

let LogModel = sequelize_conf.define('inventoryLog', {
    LogID: Sequelize.BIGINT,
    ProductID: Sequelize.BIGINT,
    InvokingEvent: Sequelize.STRING,
    LegacyInventoryResult: Sequelize.STRING,
    GetInventoryResult: Sequelize.STRING,
    DateEntered: Sequelize.DATE
})

postgreSQL.prototype.logInventoryDetails = function (callbackfunction) {
    sequelize_conf.query(sqlQuery, { bind: ['Update Cart', 25180, '142', '143'], type: sequelize.QueryTypes.INSERT }).then(function (err, result) {
        if (err) {
            console.log(err);
            if (callbackfunction) {
                callbackfunction(false);
            }
        } else {
            console.log('row inserted with id: ' + result.rows[0].LogID);
            if (callbackfunction) {
                callbackfunction(true);
            }
        }
    });
}

