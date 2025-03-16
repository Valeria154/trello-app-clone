import './style.scss'
import { addCardBtnElement, containerTodoElement } from './modules/variables'
import { handleClickButtonAddCard, handleSubmitForm, handleClickEditTodo, handleClickDeleteTodo } from './modules/handlers'

addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', handleClickEditTodo)
containerTodoElement.addEventListener('click', handleClickDeleteTodo)