function handleClickButtonAddCard() {
	toggleModal(modalFormElement) // Открываем модальное окно
	formElement.innerHTML = buildModalForm()
	const btnCloseElement = modalFormElement.querySelector('.btn-close')
	btnCloseElement.addEventListener('click', () => toggleModal(modalFormElement))
}