const todoDialog = DOM.createElement('dialog', ['todo-expand']);
const todoDetails = DOM.createElement('div', ['todo-details']);
const expandTitle = DOM.createElement('div', ['expand-title'], `Title: ${todo.title}`);
const expandDesc = DOM.createElement('div', ['expand-desc'], `Description: ${todo.desc}`);
const expandDueDate = DOM.createElement('div', ['expand-due'], `Due: ${todo.dueDate}`);
const expandPriority = DOM.createElement('div', ['expand-priority'], `Priority: ${todo.priority}`);
const cancelBtn = DOM.createElement('button', ['details-cancel'], 'Cancel');
cancelBtn.setAttribute('type', 'button');

DOM.appendChildren(todoDetails, [expandTitle, expandDesc, expandDueDate, expandPriority, cancelBtn]);
DOM.appendChildren(todoDialog, [todoDetails]);
DOM.appendChildren(todoEl, [todoDialog]);

// event listeners
todoEl.addEventListener('click', () => {
    todoDialog.showModal();
})

cancelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    todoDialog.close();
})

toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    todo.status ? todo.status = false : todo.status = true;

    DOM.updateProjectTodos(project);
})

deleteBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const { todoId } = todoEl.dataset;
    DOM.deleteTodo(project, todoId);
})