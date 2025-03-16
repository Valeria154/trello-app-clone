import { statusArr } from './variables.js'

class Todo {
	constructor({ title, description, user, status = '0' }) {
		this.id = Date.now()
		this.createdAt = new Date().toString()
		this.title = title
		this.description = description
		this.user = user
		this.status = statusArr[status]
	}
}

export { Todo }