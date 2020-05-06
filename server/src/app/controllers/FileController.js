import File from '../models/File'

class FileController {
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
