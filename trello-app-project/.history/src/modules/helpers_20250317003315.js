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