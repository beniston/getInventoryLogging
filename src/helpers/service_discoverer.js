
let PostgreSQL_DBName = "postgres"
let PostgreSQL_userName = "postgres" 
let PostgreSQL_password = "password"
var logger = require('../helpers/logger.js')

let sequelize = new Sequelize(PostgreSQL_DBName,PostgreSQL_userName,PostgreSQL_password,{
	host: 'localhost',
	dialect: 'postgresql',
	port:5432,
	//pool:{ max:5,min:0,idle:10000}
})


function ServiceDiscoverer() {
    this.sequalize_config = sequelize
}

ServiceDiscoverer.prototype.getSequalizeConfig = function() {
	logger.info("Returning the Sequalize config ")
	return this.sequalize_config;
}

module.exports = ServiceDiscoverer