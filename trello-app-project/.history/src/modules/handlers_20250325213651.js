import { todos, formElement, modalFormElement } from './variables.js'
import { Todo } from './module.js'
import { closeModal, buildModalForm, setData, render } from './helpers.js'


function handleClickButtonAddCard() {
	buildModalForm()
	closeModal(modalFormElement)
}
// function handleClickButtonAddCard() {
// 	closeModal(modalFormElement) // закрываем текущее модальное окно
// 	formElement.innerHTML = buildModalForm()
// 	const btnCloseElement = modalFormElement.querySelector('.btn-close')
// 	btnCloseElement.addEventListener('click', (event) => {
// 		if (event.target.matches('.btn-close')) {
// 			closeModal(modalFormElement)
// 		}
// 	})
// }

function handleClickCloseModal({ target }) {
	const currentModalElement = target.closest('[data-item="modal-overlay"]')
	if (target === currentModalElement || target.dataset.role == 'close-modal' || target.dataset.role == 'accept') {
		toggleModal(currentModalElement)
		if (currentModalElement.contains(formElement)) {
			formElement.reset()
		}
	}
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
	closeModal(modalFormElement)
	delete formElement.dataset.editedId
}

function handleClickEditTodo({ target }) {
	if (target.dataset.role !== 'edit') return
	const { id } = target.closest('[data-id]').dataset
	const currentTodo = todos.find(todo => todo.id == id)

	closeModal(modalFormElement)

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

export {
	handleClickButtonAddCard,
	handleSubmitForm,
	handleClickEditTodo,
	handleClickDeleteTodo
}