import './style.scss'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'

const clockElement = document.querySelector('#clock')
const addCardBtnElement = document.querySelector('#addCardBtn')
const modalFormElement = document.querySelector('#modalFormContainer')
const todoContainer = document.getElementById('#todo')
const todoCount = document.getElementById('#todoCount')
const todoContainerElement = document.querySelector('#todoContainer')
const todoFormElement = document.querySelector('#todoForm')
const statusArr = ['todo', 'inprogress', 'done']


//функция, которая отражает часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()



addCardBtnElement.addEventListener('click', handleClickButtonAddCard)

//todoContainerElement.addEventListener('submit', handleSubmitForm)
todoFormElement.addEventListener('submit', handleSubmitForm)

function handleClickButtonAddCard() {
	if (!todoFormElement) {
		modalFormElement.innerHTML = buildModalForm()
		const btnCloseElement = modalFormElement.querySelector('.btn-close')
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


// Переключение модального окна
function toggleModal(modal) {
	modal.classList.toggle('hidden');
}

// Функция добавления задачи
function handleSubmitForm(event) {
	event.preventDefault();

	// Получаем данные из формы
	const formData = new FormData(event.target);
	const formDataObject = Object.fromEntries(formData);

	// Создаём новую карточку
	const todoCard = `
		 <div class="card bg-white mb-3">
			  <div class="card-body">
					<h5 class="card-title">${formDataObject.title}</h5>
					<p class="card-text">${formDataObject.description}</p>
					<p class="text-muted">Assigned to: ${formDataObject.user}</p>
			  </div>
		 </div>
	`;

	// Добавляем карточку в контейнер TODO
	todoContainer.insertAdjacentHTML('beforeend', todoCard);

	// Обновляем счётчик задач
	updateTodoCount();

	// Сбрасываем форму и закрываем модальное окно
	event.target.reset();
	toggleModal(modalFormContainer);
}

// Обновление счётчика задач TODO
function updateTodoCount() {
	const count = todoContainer.children.length;
	todoCount.textContent = count;
}

// Открытие модального окна
addCardBtn.addEventListener('click', () => {
	toggleModal(modalFormContainer);

	// Генерация формы, если её ещё нет
	if (!modalFormContainer.querySelector('form')) {
		modalFormContainer.innerHTML = buildModalForm();

		// После создания формы добавляем обработчик отправки
		const todoForm = document.getElementById('todoForm');
		todoForm.addEventListener('submit', handleSubmitForm);

		// Добавляем обработчик для кнопки закрытия
		const btnClose = modalFormContainer.querySelector('.btn-close');
		btnClose.addEventListener('click', () => toggleModal(modalFormContainer));
	}
});

// Генерация HTML формы
function buildModalForm() {
	return `
		 <form id="todoForm" class="p-4 border rounded bg-light text-start fw-semibold w-50 position-relative">
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
					<label for="user" class="form-label fs-5">User</label>
					<select id="user" name="user" class="form-select" required>
						 <option selected value="">Choose user</option>
						 <option value="Amelia">Amelia</option>
						 <option value="Mary">Mary</option>
						 <option value="Thomas">Thomas</option>
						 <option value="Harry">Harry</option>
						 <option value="Susan">Susan</option>
					</select>
			  </div>
			  <button type="submit" class="btn btn-primary bg-secondary bg-gradient border-secondary">Add TODO</button>
			  <button type="button" class="btn-close position-absolute top-0 end-0 me-4 mt-4" aria-label="close"></button>
		 </form>
	`;
}


