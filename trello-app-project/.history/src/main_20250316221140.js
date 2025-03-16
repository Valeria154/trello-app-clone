import './style.scss'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'

// const storageKey = 'todos'
// const todos = getDataFromStorage()
// const clockElement = document.querySelector('#clock')
// const containerTodoElement = document.querySelector('.container-todo')
// const formElement = document.querySelector('#form')
// const buttonAddTodoElement = document.querySelector('#addTodoBtn')
// const deleteAllButtonElement = document.querySelector('#deleteAllBtn')
// const [todoContainerElement, inProgressContainerElement, doneContainerElement,] = document.querySelectorAll('[data-role="status-column"]')
// const [todoCountElement, inProgressCountElement, doneCountElement] = document.querySelectorAll('[data-role="count-cards"]')
// // Modals
// const formModalElement = document.querySelector('#formModal')
// const deleteAllModalElement = document.querySelector('#deleteAllModal')
// const confirmBtn = document.querySelector('[data-role="confirm-delete"]');
// const cancelBtn = document.querySelector('[data-role="cancel-delete"]');
// const progressLimitModalElement = document.querySelector('#progressLimitModal')

// const statusArr = ['todo', 'progress', 'done']
const todos = getData()
const clockElement = document.querySelector('#clock')
const addCardBtnElement = document.querySelector('#addCardBtn')
const modalFormElement = document.querySelector('#modalFormContainer')
const formElement = document.querySelector('#form')

const containerTodoElement = document.querySelector('#containerTodo')
const [todoContainerElement, inProgressContainerElement, doneContainerElement] = document.querySelectorAll('[data-role="count"]')
const [todoCountElement, inProgressCountElement, doneCountElement] = document.querySelectorAll('[data-role="status"]')
const todoContainer = document.querySelector('#todo')
const todoCount = document.querySelector('#todoCount')

const statusArr = ['todo', 'inprogress', 'done']

addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)

//Часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()

function handleClickButtonAddCard() {
	if (!formElement) {
		modalFormElement.innerHTML = buildModalForm()
		const btnCloseElement = modalFormElement.querySelector('.btn-close')
		btnCloseElement.addEventListener('click', () => toggleModal(modalFormElement))

		const formElement = modalFormElement.querySelector('#form')
		formElement.addEventListener('submit', handleSubmitForm)
	}
	toggleModal(modalFormElement) // Открываем модальное окно
}

function toggleModal(modal) {
	if (modal.classList.contains('block')) {
		modal.classList.replace('block', 'hidden')
	} else {
		modal.classList.replace('hidden', 'block')
	}
}

function buildModalForm() {
	return `
				<div class="d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
					<form id="form" class="p-4 border rounded bg-light text-start fw-semibold w-50 position-relative">
						<div class="mb-3">
							<label for="title" class="form-label fs-5">Title</label>
							<input type="text" class="form-control" id="title" placeholder="Enter todo...">
						</div>
						<div class="mb-3">
							<label for="description" class="form-label fs-5">Description</label>
							<textarea class="form-control p-2 rounded-3" id="description" rows="6"
								placeholder="Write description"></textarea>
						</div>
						<div class="mb-3">
							<label for="user" class="form-label fs-5">User </label>
							<select id="user" class="form-select">
								<option selected value="">Choose user</option>
								<option value="Amelia">Amelia</option>
								<option value="Mary">Mary</option>
								<option value="Thomas">Thomas</option>
								<option value="Harry">Harry</option>
								<option value="Susan">Susan</option>
							</select>
						</div>
						<button type="submit" class="btn btn-primary bg-secondary bg-gradient border-secondary">Add card
							TODO</button>
						<button type="button" class="btn-close position-absolute top-0 end-0 me-4 mt-4"
							aria-label="close"></button>
					</form>
				</div>
	`
}

function handleSubmitForm(event) {
	event.preventDefault()
	console.log('Форма отправляется!')
	// Получаем данные из формы
	const formData = new FormData(event.target)
	const formDataObject = Object.fromEntries(formData) // преобразуем, полученные иданные, в объект ключ-значение 
	console.log('Полученные данные:', formDataObject)

	// const { editedId } = formElement.dataset
	// if (editedId) {
	// 	const editedTodoIndex = todos.findIndex(todo => todo.id == editedId)
	// 	todos[editedTodoIndex] = { ...todos[editedTodoIndex], ...formDataObject }
	// 	setData(todos)
	// 	render(todos)
	// } else {
	if (!formDataObject == '') {
		const newTodo = new Todo(formDataObject) // создаем новую todo с данными из формы 
		todos.push(newTodo) // добавление новой задачи в массив
		setData(todos) // сохранение обновленного массива в localStorage
		render(todos) // перерисовка списка задач
	}
	formElement.reset()
	toggleModal(modalFormElement)
	delete formElement.dataset.editedId
}

function getData() {
	return JSON.parse(localStorage.getItem('todos')) || []
}

function setData(todo) {
	localStorage.setItem('todos', JSON.stringify(todo))
}

function countTodos(todos) {
	const todoCountArr = todos.filter(todo => todo.status == 'todo')
	todoCountElement.textContent = todoCountArr.length
	const inProgressArr = todos.filter(todo => todo.status == 'progress')
	inProgressCountElement.textContent = inProgressArr.length
	const doneCountArr = todos.filter(todo => todo.status == 'done')
	doneCountElement.textContent = doneCountArr.length
}

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

function buildTodoTemplate({ id, title, description, user, status, createdAt }) {
	const date = currentDate(createdAt)
	return `
				<div data-id="${id}" class="card">
					<div class="card-header d-flex justify-content-between" role="group">
						<button type="button" class="btn btn-light" data-role="edit">Edit</button>
						<select name="status" class="form-select" aria-label="Default select example">
							<option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
							option value="progress" ${status == 'progress' ? 'selected' : ''}>In progress</option>
									<option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
								</select>
								<button type="button" class="btn btn-light" data-role="remove">Delete</button>
							</div>
							<div class="card-body">
								<h4 class="card-title text-start">${title}</h4>
								<p class="card-text text-start">${description}</p>
							</div>
							<div class="card-footer d-flex justify-content-between">
								<div class="card-title text-start">${user}</div>
								<div class="card-text text-start">${date}</div>
							</div>
						</div>
	`
}

function currentDate(date = '', locale = 'ru-RU') {
	const dateTemplate = new Date(date)
	return `${dateTemplate.toLocaleDateString(locale)}, ${dateTemplate.toLocaleTimeString(locale)}`
}
// function currentDate(date = '', locale = 'ru-RU') {
// 	const dateTemplate = new Date(date)
// 	// const dateFormat = {
// 	// 	hour: 'numeric',
// 	// 	minute: 'numeric',
// 	// 	year: 'numeric',
// 	// 	month: 'numeric',
// 	// 	day: 'numeric'
// 	// }
// 	return `${dateTemplate.toLocaleDateString(locale)}, ${dateTemplate.toLocaleTimeString(locale)}`
// 	// return new Intl.DateTimeFormat(locale, dateFormat).format(dateTemplate)
// }

// class Todo {
// 	id = Date.now()
// 	createdAt = new Date().toString()
// 	constructor({ title, description, user, status = '0' }) {
// 		this.title = title
// 		this.description = description
// 		this.user = user
// 		this.status = statusArr[status]
// 	}