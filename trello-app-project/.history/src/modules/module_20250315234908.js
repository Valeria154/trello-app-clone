class Todo {
	id = Data.now()
	createdAt = new Date().toString()
	constructor({ title, description, user, status = '0' }) {
		this.title = title
		this.description = description
		this.user = user
		this.status = statusArr[status]
	}
}

