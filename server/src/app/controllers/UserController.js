import User from '../models/User'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import WelcomeMail from '../jobs/WelcomeMail'
import Exception from '../exceptions/Exception'

class UserController {
	async store(req, res) {
		const userExists = await User.findOne({ where: { email: req.body.email } })

		if (userExists) {
			throw new Exception({
				status: 400,
				message: 'User already exists',
			})
		}

		const { id, name, email } = await User.create(req.body)

		await Notification.create({
			content: `Seja muito bem vindo(a) ao Athos ${name}!`,
			user: id,
		})

		await Queue.add(WelcomeMail.key, { name, email })

		return res.json({ id, name, email })
	}

	async update(req, res) {
		const { email, oldPassword, password } = req.body
		delete req.body.oldPassword
		delete req.body.password
		delete req.body.confirmPassword

		const user = await User.findByPk(req.userId)

		if (email && email !== user.email) {
			const userExists = await User.findOne({
				where: { email },
			})

			if (userExists) {
				throw new Exception({
					status: 400,
					message: 'User already exists',
				})
			}
		}

		if (oldPassword) {
			if (!(await user.checkPassword(oldPassword))) {
				throw new Exception({
					status: 400,
					message: 'Password does not match',
				})
			}
			await user.update({ password })
		}

		const { id, name } = await user.update(req.body)

		return res.json({ id, name, email: email || user.email })
	}
}

export default new UserController()
