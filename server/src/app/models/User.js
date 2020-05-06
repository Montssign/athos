import Sequelize, { Model } from 'sequelize'
import bcrypt from 'bcryptjs'

class User extends Model {
	static init(sequelize) {
		super.init(
			{
				id: {
					type: Sequelize.UUID,
					defaultValue: Sequelize.UUIDV4,
					primaryKey: true,
				},
				name: Sequelize.STRING,
				email: Sequelize.STRING,
				password: Sequelize.STRING,
			},
			{
				sequelize,
				paranoid: true,
			}
		)

		this.addHook('beforeSave', async (user) => {
			if (!bcrypt.getRounds(user.password)) {
				user.password = await bcrypt.hash(user.password, 10)
			}
		})

		return this
	}

	checkPassword(password) {
		return bcrypt.compare(password, this.password)
	}
}

export default User
