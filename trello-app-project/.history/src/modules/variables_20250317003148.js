const todos = getData()
const clockElement = document.querySelector('#clock')
const addCardBtnElement = document.querySelector('#addCardBtn')
const modalFormElement = document.querySelector('#modalFormContainer')
const formElement = document.querySelector('#form')
const containerTodoElement = document.querySelector('#containerTodo')
const [todoCountElement, inProgressCountElement, doneCountElement] = document.querySelectorAll('[data-role="count"]')
const [todoContainerElement, inProgressContainerElement, doneContainerElement] = document.querySelectorAll('[data-role="status"]')
const statusArr = ['todo', 'inprogress', 'done']

export {
	todos,
	clockElement,
	addCardBtnElement,
	modalFormElement,
	formElement,
	containerTodoElement,

}