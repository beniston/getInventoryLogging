'use strict'
var Sequelize = require('sequelize')
let PostgreSQL_DBName = "postgres"
let PostgreSQL_userName = "postgres" 
let PostgreSQL_password = "password"
var logger = require('../helpers/logger.js')

var sequelize = new Sequelize(PostgreSQL_DBName,PostgreSQL_userName,PostgreSQL_password,{
	host: 'localhost',
	dialect: 'postgresql',
	native: false,
	port:5432,
	//pool:{ max:5,min:0,idle:10000}
})


function ServiceDiscoverer() {
    this.sequalize_config = sequelize
}

ServiceDiscoverer.prototype.getSequalizeConfig = function() {
	logger.info("Returning the Sequalize config ")
	return this.sequalize_config
}

module.exports = ServiceDiscoverer