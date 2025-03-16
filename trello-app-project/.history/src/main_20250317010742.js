import './style.scss'
import { addCardBtnElement, containerTodoElement } from './modules/variables.js'
import { handleClickButtonAddCard, handleSubmitForm, handleClickEditTodo, handleClickDeleteTodo } from './modules/handlers.js'

addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', handleClickEditTodo)
containerTodoElement.addEventListener('click', handleClickDeleteTodo)