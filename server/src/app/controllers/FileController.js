import File from '../models/File'

class FileController {
	async index(req, res) {
		const { page = 1, limit = 20, type, isPublic } = req.query

		const where = { ownerId: req.userId }

		if (type) {
			where.type = type
		}
		if (isPublic) {
			where.ownerId = null
		}

		const files = await File.findAll({
			where,
			order: ['updatedAt'],
			attributes: ['id', 'name', 'path', 'url', 'size', 'mimetype', 'type'],
			limit,
			offset: (page - 1) * limit,
		})

		return res.json(files)
	}

	async store(req, res) {
		const { type } = req.body
		// const ownerId = req.body.noOwner ? null : req.userId
		const ownerId = req.userId

		const files = await Promise.all(
			req.files.map((sendedFile) => {
				const {
					originalname: name,
					filename: path,
					size,
					mimetype,
				} = sendedFile

				return File.create({
					name,
					path,
					size,
					mimetype,
					type,
					ownerId,
				})
			})
		)

		return res.json(files)
	}
}

export default new FileController()
