require('dotenv/config')

module.exports = {
	dialect: process.env.DB_DRIVE,
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	database: process.env.DB_PASS,
	password: process.env.DB_NAME,
	logging: process.env.DB_LOGGING === 'true',
	dialectOptions: {
		useUTC: false,
	},
	timezone: '-03:00',
	define: {
		charset: 'utf8',
		dialectOptions: {
			collate: 'utf8_general_ci',
		},
		timestamps: true,
	},
}
