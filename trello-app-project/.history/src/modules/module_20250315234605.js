class Todo {
	id = Data.now()
	createdAt = new Date().toString()
	constructor({ title, description, user, status = '0' })
}