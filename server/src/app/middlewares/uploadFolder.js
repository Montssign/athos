import { resolve } from 'path'
import fs from 'fs'

export default (req, res, next) => {
	const path = resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')

	fs.mkdirSync(path)

	return next()
}
