import './style.scss'



addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', handleClickEditTodo)
containerTodoElement.addEventListener('click', handleClickDeleteTodo)

function handleClickButtonAddCard() {
	toggleModal(modalFormElement) // Открываем модальное окно
	formElement.innerHTML = buildModalForm()
	const btnCloseElement = modalFormElement.querySelector('.btn-close')
	btnCloseElement.addEventListener('click', () => toggleModal(modalFormElement))
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

	formElement.innerHTML = buildModalForm()
	const titleInput = formElement.querySelector('[name="title"]')
	const descriptionInput = formElement.querySelector('[name="description"]')
	const userSelect = formElement.querySelector('[name="user"]')

	titleInput.value = currentTodo.title
	descriptionInput.value = currentTodo.description
	userSelect.value = currentTodo.user

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
