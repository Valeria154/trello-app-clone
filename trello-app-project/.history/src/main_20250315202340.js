import './style.scss'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'

const clockElement = document.querySelector('#clock')
const addCardElement = document.querySelector('#addCardBtn')
const modalFormElement = document.querySelector('#modalFormContainer')

//функция, которая отражает часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()


//открытие модального окна после клика
addCardElement.addEventListener('click', handleClickButtonAddCard)

function handleClickButtonAddCard() {
	toggleModal(modalFormElement)
	modalFormElement.innerHTML = buildModalForm()
}

function toggleModal(modal) {
	modal.classList.toggle('show'); // Переключает класс "show", отвечающий за видимость
}
function buildModalForm() {
	return `
				<form class="p-4 border rounded bg-light text-start fw-semibold w-50 position-absolute top-0 start-0">
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
					<button type="submit" class="btn btn-primary bg-secondary bg-gradient border-secondary">Add card TODO</button>
					<button type="button" class="btn-close position-absolute top-0 end-0 me-4 mt-4" aria-label="close"></button>
				</form>
	`

}

