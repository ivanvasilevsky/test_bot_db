const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
	'vasilevs_test_bot',
	'vasilevs_user',
	'5Dtio16!8',
	{
		host: 'srv-db-pgsql01.ps.kz',
		port: '5432',
		dialect: 'postgres'
	}
)