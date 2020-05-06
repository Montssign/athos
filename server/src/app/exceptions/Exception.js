class Exception extends Error {
	constructor(payload = {}) {
		let { message, status, name } = payload
		if (!status) {
			status = 500
		}
		if (!message) {
			message = 'Server internal error'
		}
		if (!name) {
			name = 'Server error'
		}
		super(message)

		this.name = name || this.constructor.name
		this.status = status
	}
}

module.exports = Exception
