import Notification from '../schemas/Notification'

class NotificationController {
	async index(req, res) {
		const { page = 1, limit = 20 } = req.query

		const notifications = await Notification.find({
			user: req.userId,
		})
			.sort('createdAt')
			.limit(limit)
			.skip((page - 1) * limit)

		return res.json(notifications)
	}

	async update(req, res) {
		const notification = await Notification.findOneAndUpdate(
			{ _id: req.params.id, user: req.userId },
			{ read: true },
			{ new: true }
		)

		return res.json(notification)
	}
}

export default new NotificationController()
