import './style.scss'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'

const clockElement = document.querySelector('#clock')
const addCardElement = document.querySelector('#addCardBtn')
const modalFormElement = document.querySelector('#modalFormContainer')
const btnCloseElement = document.querySelector('.btn-close')
const todoContainerElement = document.querySelector('.todo-wrapp')


//функция, которая отражает часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()


//открытие модального окна
addCardElement.addEventListener('click', handleClickButtonAddCard)
btnCloseElement.addEventListener('click', handleClickBtnCloseModal)
todoContainerElement.addEventListener('submit', handleSubmitForm)




function handleClickButtonAddCard() {
	toggleModal(modalFormElement)
	modalFormElement.innerHTML = buildModalForm()
}

function toggleModal(modal) {
	modal.classList.toggle('show'); // Переключает класс "show", отвечающий за видимость
}
function buildModalForm() {
	return `
				<div class="d-flex align-items-center justify-content-center position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50">
					<form class="p-4 border rounded bg-light text-start fw-semibold w-50 position-relative">
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
	event.preventDefault()

	const formData = new FormData(event.target)
	const formDataObject = Object.fromEntries(formData)

	const { editedId } = formElement.dataset
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
	delete formElement.dataset.editedId;
}

function buildTodoTemplate({ id, title, description, user, status, createdAt }) {
	return `
	        <div data-id="${id}" class="card bg-white rounded-lg">
            <div class="flex py-4 justify-center" role="group">
                <button type="button" class="btn btn-light" data-role="edit">Edit</button>
                <select name="status" class="card-btns_select">
                    <option value="todo" ${status == 'todo' ? 'selected' : ''}>Todo</option>
                    <option value="progress" ${status == 'progress' ? 'selected' : ''}>In progress</option>
                    <option value="done" ${status == 'done' ? 'selected' : ''}>Done</option>
                </select>
                <button type="button" class="btn btn-light" data-role="remove">Delete</button>
            </div>
            <div class="w-full px-4 mb-2">
                <h3 class="mb-2 text-lg text-gray-800">${title}</h3>
                <div class="text-base text-gray-800">${description}</div>
            </div>
            <div class="p-4 flex justify-between text-base text-gray-800">
                <div>${assignUser}</div>
                <div>${data}</div>
            </div>
        	</div>
	`
}