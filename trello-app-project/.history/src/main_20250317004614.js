import './style.scss'
import { addCardBtnElement, containerTodoElement } from './modules/variables'


addCardBtnElement.addEventListener('click', handleClickButtonAddCard)
containerTodoElement.addEventListener('submit', handleSubmitForm)
containerTodoElement.addEventListener('click', handleClickEditTodo)
containerTodoElement.addEventListener('click', handleClickDeleteTodo)