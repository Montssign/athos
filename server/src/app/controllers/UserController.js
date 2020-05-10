import * as Yup from 'yup'

import User from '../models/User'
import Notification from '../schemas/Notification'
import Queue from '../../lib/Queue'
import WelcomeMail from '../jobs/WelcomeMail'

class UserController {
	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().min(6).required(),
			email: Yup.string().email().required(),
			password: Yup.string().min(6).required(),
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' })
		}

		const userExists = await User.findOne({ where: { email: req.body.email } })

		if (userExists) {
			return res.status(400).json({ error: 'User already exists' })
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
		const schema = Yup.object().shape({
			name: Yup.string().min(3),
			email: Yup.string().email(),
			oldPassword: Yup.string().min(6),
			password: Yup.string()
				.min(6)
				.when('oldPassword', (oldPassword, field) =>
					oldPassword ? field.required() : field
				),
			confirmPassword: Yup.string().when('password', (password, field) =>
				password ? field.required().oneOf([Yup.ref('password')]) : field
			),
		})

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' })
		}

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
				return res.status(400).json({ error: 'User already exists' })
			}
		}

		if (oldPassword) {
			if (!(await user.checkPassword(oldPassword))) {
				return res.status(401).json({ error: 'Password does not match' })
			}
			await user.update({ password })
		}

		const { id, name } = await user.update(req.body)

		return res.json({ id, name, email: email || user.email })
	}
}

export default new UserController()
