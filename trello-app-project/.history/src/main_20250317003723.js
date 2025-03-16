import './style.scss'



addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', handleClickEditTodo)
containerTodoElement.addEventListener('click', handleClickDeleteTodo)



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
