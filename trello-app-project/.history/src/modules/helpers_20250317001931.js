function handleClickEditTodo({ target }) {
	const cardElement = target.closest('.card');

	const { id } = cardElement.dataset;

	const todo = todos.find(todo => todo.id == id);

	toggleModal(modalFormElement);

	// Заполняем форму данными задачи
	const formElement = modalFormElement.querySelector('#form');
	if (formElement) {
		formElement.querySelector('#title').value = todo.title || '';
		formElement.querySelector('#description').value = todo.description || '';
		formElement.querySelector('#user').value = todo.user || '';
		formElement.dataset.editedId = todo.id;
	} else {
		console.error('Форма редактирования не найдена');
	}
}