import Sequelize from 'sequelize'

import databaseConfig from '../configs/database'

import User from '../app/models/User'
import File from '../app/models/File'

// Insert new models here
const models = [User, File]

class Database {
	constructor() {
		this.init()
	}

	init() {
		this.connection = new Sequelize(databaseConfig)

		models.map((model) => model.init(this.connection))
	}
}

export default new Database()
