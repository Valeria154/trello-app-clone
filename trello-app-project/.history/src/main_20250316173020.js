import './style.scss'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'

const clockElement = document.querySelector('#clock')
const addCardBtnElement = document.querySelector('#addCardBtn')
const modalFormElement = document.querySelector('#modalFormContainer')
const btnCloseElement = document.querySelector('.btn-close')
const todoContainerElement = document.querySelector('#todoContainer')
const todoFormElement = document.querySelector('#todoForm')
const statusArr = ['todo', 'inprogress', 'done']


//функция, которая отражает часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()


//открытие модального окна
addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
//btnCloseElement.addEventListener('click', handleClickBtnCloseModal)
//todoContainerElement.addEventListener('submit', handleSubmitForm)
todoFormElement.addEventListener('submit', handleSubmitForm)



function handleClickButtonAddCard() {
	if (!todoFormElement) {
		modalFormElement.innerHTML = buildModalForm()
		btnCloseElement.addEventListener('click', () => toggleModal(modalFormElement))
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
					<form id="todoForm" class="p-4 border rounded bg-light text-start fw-semibold w-50 position-relative">
						<div class="mb-3">
							<label for="title" class="form-label fs-5">Title</label>
							<input type="text" class="form-control" id="title" placeholder="Enter todo..." required>
						</div>
						<div class="mb-3">
							<label for="description" class="form-label fs-5">Description</label>
							<textarea class="form-control p-2 rounded-3" id="description" rows="6"
								placeholder="Write description" required></textarea>
						</div>
						<div class="mb-3">
							<label for="user" class="form-label fs-5">User </label>
							<select id="user" class="form-select" required>
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
							aria-label="close" data-dismiss="modal" data-set="remove"></button>
					</form>
				</div>
	`
}

function handleSubmitForm(event) {
	event.preventDefault() // Останавливаем стандартное действие отправки формы

	// Получаем данные из формы
	const formData = new FormData(event.target) //создает объект, содержащий все данные, введённые в форму; event.target - сама форма, отправляемая при событии submit
	const formDataObject = Object.fromEntries(formData) //Преобразует пары ключ-значение из объекта FormData в обычный объект JS.

	cardContainer.insertAdjacentHTML('beforeend', buildTodoTemplate)
	formElement.reset()

	const { editedId } = formElement.dataset //для редоктирования формы
	if (editedId) {
		const editedTodoIndex = todos.findIndex(todo => todo.id == editedId)
		todos[editedTodoIndex] = { ...todos[editedTodoIndex], ...formDataObject }
		setDataToStorage(todos)
		render(todos)
	} else {
		const newTodo = new Todo(formDataObject)
		todos.push(newTodo)
		setDataToStorage(todos)
		render(todos)
	}
	formElement.reset()
	toggleModal(formModalElement)
	delete formElement.dataset.editedId
}
class Todo {
	id = Date.now()
	createdAt = new Date().toString()
	constructor({ title, description, user, status = '0' }) {
		this.title = title
		this.description = description
		this.user = user
		this.status = statusArr[status]
	}
}
function buildTodoTemplate({ id, title, description, user, status, createdAt }) {
	const data = createdAt(currentDate)
	return `
	        <div data-id="${id}" class="card bg-white">
            <div class="d-flex justify-content-center" role="group">
                <button type="button" class="btn btn-light" data-role="edit">EDIT</button>
                <select name="status" class="btn btn-light">
                    <option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
                    <option value="progress" ${status == 'progress' ? 'selected' : ''}>In progress</option>
                    <option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
                </select>
                <button type="button" class="btn btn-light" data-role="remove">DELETE</button>
            </div>
            <div class="p-4 mb-2">
                <h4 class="text-start fs-5 fw-semibold">${title}</h4>
                <div class="text-start fs-6"><p>${description}</p></div>
            </div>
            <div class="d-flex justify-content-between text-start">
                <div>${user}</div>
                <div>${data}</div>
            </div>
        	</div>
	`
}

function currentDate(date = '', locale = 'ru-RU') {
	const dateTemplate = new Date(date)
	// const dateFormat = {
	// 	hour: 'numeric',
	// 	minute: 'numeric',
	// 	year: 'numeric',
	// 	month: 'numeric',
	// 	day: 'numeric'
	// }
	return `${dateTemplate.toLocaleDateString(locale)}, ${dateTemplate.toLocaleTimeString(locale)}`
	// return new Intl.DateTimeFormat(locale, dateFormat).format(dateTemplate)
}