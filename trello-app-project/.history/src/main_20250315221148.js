import './style.scss'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'

const clockElement = document.querySelector('#clock')
const addCardElement = document.querySelector('#addCardBtn')
const modalFormElement = document.querySelector('#modalFormContainer')
const btnCloseElement = document.querySelector('.btn-close')

//функция, которая отражает часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()


//открытие модального окна
addCardElement.addEventListener('click', handleClickButtonAddCard)
btnCloseElement.addEventListener('click', handleClickBtnCloseModal)


function handleClickBtnCloseModal(event) {
	const currentModalFormElement = event.target.closest('[data-item="modal"]');
	if (!currentModalFormElement) return;

	if (event.target.dataset.role === 'remove') {
		toggleModal(currentModalFormElement);

		const formElement = currentModalFormElement.querySelector('form');
		if (formElement) {
			formElement.reset();
		}
	}
}

// function handleClickBtnCloseModal({ target }) {
// 	const currentModalElement = target.closest('[data-item="modal"]')
// 	if (target === currentModalElement || target.dataset.role == 'close-modal' || target.dataset.role == 'accept') {
// 		toggleModal(currentModalElement)
// 		if (currentModalElement.contains(formElement)) {
// 			formElement.reset()
// 		}
// 	}
// }


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
						
					</form>
					<button type="button" class="btn-close position-absolute top-0 end-0 me-4 mt-4"
							aria-label="close" data-dismiss="modal" data-set="remove"></button>
				</div>
	`
}


