import './style.scss'

const todos = getData()
const clockElement = document.querySelector('#clock')
const addCardBtnElement = document.querySelector('#addCardBtn')
const modalFormElement = document.querySelector('#modalFormContainer')
const formElement = document.querySelector('#form')

const containerTodoElement = document.querySelector('#containerTodo')
const [todoCountElement, inProgressCountElement, doneCountElement] = document.querySelectorAll('[data-role="count"]')
const [todoContainerElement, inProgressContainerElement, doneContainerElement] = document.querySelectorAll('[data-role="status"]')
//const todoContainer = document.querySelector('#todo')
//const todoCount = document.querySelector('#todoCount')

const statusArr = ['todo', 'inprogress', 'done']

addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', handleClickEditTodo)
containerTodoElement.addEventListener('click', handleClickDeleteTodo)

//Часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()

function handleClickButtonAddCard() {
	toggleModal(modalFormElement) // Открываем модальное окно
	formElement.innerHTML = buildModalForm()
	const btnCloseElement = modalFormElement.querySelector('.btn-close')
	btnCloseElement.addEventListener('click', () => toggleModal(modalFormElement))
}

function toggleModal(modal) {
	if (modal.classList.contains('hidden')) {
		modal.classList.replace('hidden', 'block')
	} else {
		modal.classList.replace('block', 'hidden')
	}
}

function buildModalForm() {
	return `
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
	`
}

function handleSubmitForm(event) {
	event.preventDefault()
	// Получаем данные из формы
	const formData = new FormData(event.target)
	const formDataObject = Object.fromEntries(formData) // преобразуем, полученные иданные, в объект ключ-значение 

	const { editedId } = formElement.dataset
	if (editedId) {
		const editedTodoIndex = todos.findIndex(todo => todo.id == editedId)
		todos[editedTodoIndex] = { ...todos[editedTodoIndex], ...formDataObject }
		setData(todos)
		render(todos)
	} else {
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
				<div data-id="${id}" class="card mb-4">
					<div class="card-header d-flex justify-content-between" role="group">
						<button type="button" class="btn btn-light" data-role="edit">Edit</button>
						<select name="status" class="form-select" aria-label="Default select example">
							<option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
							<option value="progress" ${status == 'progress' ? 'selected' : ''}>In progress</option>
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

function handleClickEditTodo({ target }) {
	if (target.dataset.role !== 'edit') return

	const { id } = target.closest('[data-id]').dataset
	const currentTodo = todos.find(todo => todo.id == id)

	toggleModal(modalFormElement)

	formElement.innerHTML = buildFormModal()
	const titleInput = formElement.querySelector('[name="title"]');
	const descriptionInput = formElement.querySelector('[name="description"]');
	const userSelect = formElement.querySelector('[name="assignUser"]');

	titleInput.value = currentTodo.title;
	descriptionInput.value = currentTodo.description;
	userSelect.value = currentTodo.assignUser;

	formElement.dataset.editedId = currentTodo.id
}

function handleClickDeleteTodo({ target }) {
	const { role } = target.dataset
	if (role == 'remove') {
		const cardElement = target.closest('.card')
		const { id } = cardElement.dataset
		const index = todos.findIndex(todo => todo.id == id)
		if (index !== -1) {
			todos.splice(index, 1)
			setData(todos)
			render(todos)
		}
	}
}
