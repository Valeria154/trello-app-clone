import './style.scss'
// import javascriptLogo from './javascript.svg'
// import viteLogo from '/vite.svg'

const clockElement = document.querySelector('#clock')
const addCardElement = document.querySelector('#addCardBtn')
const formElement =

	//функция, которая отражает часы
	function showClock() {
		clockElement.textContent = new Date().toLocaleTimeString()
	}
setInterval(showClock, 1000)
showClock()

addCardElement.addEventListener('click', handleClickButtonAddCard)

function handleClickButtonAddCard() {
	Toggle
}
// function handleClickButtonAddTodo() {
// 	toggleModal(formModalElement)
// 	formElement.innerHTML = buildFormModal()
// }

