//Часы
function showClock() {
	clockElement.textContent = new Date().toLocaleTimeString()
}
setInterval(showClock, 1000)
showClock()