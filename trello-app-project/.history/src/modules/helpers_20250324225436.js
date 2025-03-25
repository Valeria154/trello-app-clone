import {
	clockElement,
	todoContainerElement,
	inProgressContainerElement,
	doneContainerElement,
	todos,
	todoCountElement,
	inProgressCountElement,
	doneCountElement,
	formElement
} from './variables.js'

function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()

}
setInterval(showClock, 1000)

function closeModal(modal) {
	if (modal.classList.contains('hidden')) {
		modal.classList.replace('hidden', 'block')
	} else {
		modal.classList.replace('block', 'hidden')
	}
}

async function buildModalForm() {
	formElement.innerHTML = `
				<div class="mb-3">
					<label for="title" class="form-label fs-5">Title</label>
					<input type="text" class="form-control" id="title" name="title" placeholder="Enter todo..." required>
				</div>
				<div class="mb-3">
					<label for="description" class="form-label fs-5">Description</label>
					<textarea class="form-control p-2 rounded-3" id="description" name="description" rows="6"
						placeholder="Write description" required></textarea>
				</div>
				<div class="mb-3">
					<label for="user" class="form-label fs-5">User </label>
					<select id="user" name="user" class="form-select" required>
						<option selected value="">Choose user</option>
					</select>
				</div>
				<button type="submit" class="btn btn-primary bg-secondary bg-gradient border-secondary">Add card
					TODO</button>
				<button type="button" class="btn-close position-absolute top-0 end-0 me-4 mt-4"
					aria-label="close"></button>
	`
	await getUsers()
}

function buildTodoTemplate({ id, title, description, user, status, createdAt }) {
	const date = currentDate(createdAt)
	return `
				<div data-id="${id}" class="card mb-4">
					<div class="card-body">
						<h4 class="card-title text-start">${title}</h4>
						<p class="card-text text-start">${description}</p>
					</div>
					<div class="card-header d-flex justify-content-between" role="group">
						<button type="button" class="btn btn-light" data-role="edit">Edit</button>
						<select name="status" class="form-select" aria-label="Default select example">
							<option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
							<option value="progress" ${status == 'progress' ? 'selected' : ''}>In progress</option>
							<option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
						</select>
						<button type="button" class="btn btn-light" data-role="remove">Delete</button>
					</div>
					<div class="card-footer d-flex justify-content-between">
						<div class="card-title text-start">${user}</div>
						<div class="card-text text-start">${date}</div>
					</div>
				</div>
	`
}

function getData() {
	return JSON.parse(localStorage.getItem('todos')) || []
}

function setData(todo) {
	localStorage.setItem('todos', JSON.stringify(todo))
}

function currentDate(date = '', locale = 'ru-RU') {
	const dateTemplate = new Date(date)
	return `${dateTemplate.toLocaleDateString(locale)}, ${dateTemplate.toLocaleTimeString(locale)}`
}

function render(todos = []) {
	todoContainerElement.innerHTML = '' //очищает контейнер задач
	inProgressContainerElement.innerHTML = ''
	doneContainerElement.innerHTML = ''
	todos.forEach(todo => {
		const statusColumn = document.querySelector(`#${todo.status}`)
		statusColumn.insertAdjacentHTML('beforeend', buildTodoTemplate(todo)) //новые задачи будут отображаться внизу так как beforeend вставляет новую задачу в конец контейнера
	})
	countTodos(todos)
	showClock()
}

function countTodos(todos) {
	const todoCountArr = todos.filter(todo => todo.status == 'todo')
	todoCountElement.textContent = todoCountArr.length
	const inProgressArr = todos.filter(todo => todo.status == 'progress')
	inProgressCountElement.textContent = inProgressArr.length
	const doneCountArr = todos.filter(todo => todo.status == 'done')
	doneCountElement.textContent = doneCountArr.length
}

async function getUsers() {
	try {
		const response = await fetch('https://jsonplaceholder.typicode.com/users/?_limit=5')
		const users = await response.json()
		const selectUsers = document.querySelector('#user')
		if (!selectUsers) {
			console.error("Элемент с ID 'user' не найден.")
			return
		}
		users.forEach((user) => {
			const optionUser = document.createElement('option')
			optionUser.value = user.username
			optionUser.textContent = user.username
			selectUsers.append(optionUser)
		})
	} catch (error) {
		alert('Проверь свои действия')
	}
}

export {
	showClock,
	closeModal,
	buildModalForm,
	buildTodoTemplate,
	getData,
	setData,
	currentDate,
	render,
	countTodos
}