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

//открытие модального окна
addCardElement.addEventListener('click', handleClickButtonAddCard)

function handleClickButtonAddCard() {
	toggleModal(modalFormElement)
	modalFormElement.innerHTML = buildModalForm()
}

function buildModalForm() {
	return `
				<form class="p-4 border rounded bg-light text-start fw-semibold w-50 position-relative">
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

// function handleClickButtonAddTodo() {
// 	toggleModal(formModalElement)
// 	formElement.innerHTML = buildFormModal()
// }

// function buildFormModal() {
// 	return `
// 			  <div class="mb-6 flex flex-col gap-4">
// 					<div class="">
// 						 <label for="title" class="mb-2 block text-sm font-medium text-gray-900"
// 							  >Title</label
// 						 >
// 						 <input
// 							  type="text"
// 							  name="title"
// 							  id="title"
// 							  class="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
// 							  placeholder="Enter todo..."
// 							  required=""
// 						 />
// 					</div>
// 					<div class="">
// 						 <label for="description" class="mb-2 block text-sm font-medium text-gray-900"
// 							  >Description</label
// 						 >
// 						 <textarea
// 							  name="description"
// 							  id="description"
// 							  rows="4"
// 							  class="block w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
// 							  placeholder="Write description here"
// 							  required
// 						 ></textarea>
// 					</div>
// 					<div class="">
// 						 <label for="assign-user" class="mb-2 block text-sm font-medium text-gray-900"
// 							  >User</label
// 						 >
// 						 <select
// 							  name="assignUser"
// 							  id="assign-user"
// 							  class="focus:ring-primary-500 focus:border-primary-500 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900"
// 							  required
// 						 >
// 							  <option selected value="">Choose assign user</option>
// 							  <option value="Adam">Adam</option>
// 							  <option value="Jane">Jane</option>
// 							  <option value="Kate">Kate</option>
// 							  <option value="Mike">Mike</option>
// 						 </select>
// 					</div>
// 			  </div>
// 			  <button type="submit" class="submit-form-btn">
// 					<svg
// 					class="-ms-1 me-1 h-5 w-5"
// 					fill="currentColor"
// 					viewBox="0 0 20 20"
// 					xmlns="http://www.w3.org/2000/svg"
// 					>
// 					<path
// 						 fill-rule="evenodd"
// 						 d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
// 						 clip-rule="evenodd"
// 					></path>
// 					</svg>
// 					Add todo
// 			  </button>
// 	`
// }