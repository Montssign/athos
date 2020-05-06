import Sequelize, { Model } from 'sequelize'

class File extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				path: Sequelize.STRING,
				mimetype: Sequelize.STRING,
				type: Sequelize.ENUM(['avatar', 'background', 'file']),
				size: Sequelize.INTEGER,
			},
			{
				sequelize,
			}
		)

		return this
	}
}

export default File
