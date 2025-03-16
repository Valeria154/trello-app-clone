//Часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()

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