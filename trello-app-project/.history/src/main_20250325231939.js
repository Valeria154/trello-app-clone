import './style.scss'
import { addCardBtnElement, containerTodoElement } from './modules/variables.js'
import {
	handleClickButtonAddCard,
	handleClickCloseForm,
	handleSubmitForm,
	handleClickEditTodo,
	handleChangeCardSelect,
	handleClickDeleteTodo
}
	from './modules/handlers.js'
import { render } from './modules/helpers.js'

addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', handleClickCloseForm)
containerTodoElement.addEventListener('click', handleClickEditTodo)
containerTodoElement.addEventListener('change', handleChangeCardSelect)
containerTodoElement.addEventListener('click', handleClickDeleteTodo)

render()