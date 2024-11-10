// MODAL FOR TODO DETAILS
const expandDialog = document.querySelector('.todo-expand');
const expandTitle = document.querySelector('.title-expand');
const expandDesc = document.querySelector('.desc-expand');
const expandDueDate = document.querySelector('.due-expand');
const expandPriority = document.querySelector('.priority-expand');
const cancelBtn = document.querySelector('.todo-expand-cancel');

expandTitle.innerHTML = `<b>Title:</b> ${todo.title}`;
expandDesc.innerHTML = `<b>Description:</b> ${todo.desc}`;
expandDueDate.innerHTML = `<b>Due Date:</b> ${todo.due}`;
expandPriority.innerHTML = `<b>Priority:</b> ${todo.priority}`;


// event listeners
todoEl.addEventListener('click', () => {
    expandDialog.showModal();
})

cancelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    expandDialog.close();
})


deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const { todoId } = todoEl.dataset;
    TodoUI.deleteTodo(project, todoId);
})