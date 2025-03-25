import './style.scss'
import { addCardBtnElement, containerTodoElement } from './modules/variables.js'
import { handleClickButtonAddCard, handleSubmitForm, handleClickEditTodo, handleClickDeleteTodo } from './modules/handlers.js'
import { render } from './modules/helpers.js'

addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', ha)
containerTodoElement.addEventListener('click', handleClickEditTodo)
containerTodoElement.addEventListener('click', handleClickDeleteTodo)