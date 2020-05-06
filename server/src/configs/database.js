module.exports = {
	dialect: 'postgres',
	host: 'localhost',
	username: 'athos',
	database: 'athos',
	password: 'mysecretpassword',
	// logging: true,
	dialectOptions: {
		useUTC: false
	},
	timezone: "-03:00",
	define: {
		charset: "utf8",
		dialectOptions: {
			collate: "utf8_general_ci"
		},
		timestamps: true,
	},
}
