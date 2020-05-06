import Sequelize from 'sequelize'

import databaseConfig from '../configs/database'

import User from '../app/models/User'

// Insert new models here
const models = [User]

class Database {
	constructor() {
		this.init()
	}

	init() {
		this.connection = new Sequelize(databaseConfig)

		models.map(model => model.init(this.connection))
	}
}

export default new Database()
