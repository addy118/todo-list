// MODAL FOR ADDING TODOS
const dialog = document.querySelector('.todo-dialog')
const showDialog = document.querySelector('.create-todo');
const cancelDialog = document.querySelector('.todo-cancel');
const createTodo = document.querySelector('.todo-form');

showDialog.addEventListener('click', () => {
    dialog.showModal();
});

cancelDialog.addEventListener('click', () => {
    dialog.close();
})

createTodo.addEventListener('click', (e) => {
    e.preventDefault();

    const title = document.getElementById('todo-title').value;
    const desc = document.getElementById('todo-desc').value;
    const dueDate = document.getElementById('todo-due').value;
    const priority = document.getElementById('todo-priority').value;

    const newTodo = new Todo(title, desc, dueDate, priority);
    project.addTodo(newTodo);
    TodoUI.renderProjectTodos(project);

    dialog.close();
})