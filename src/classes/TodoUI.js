import { DOM } from "./DOM.js";
import { Project } from "./Project.js";

export class TodoUI {
    // projectwise todos
    static renderProjectTodos(project) {
        const todosContainer = document.querySelector('.todos-container');
        DOM.clearContainer(todosContainer);

        project.todos.forEach(todo => {
            const todoEl = DOM.createElement('div', ['todo']);
            todoEl.setAttribute('data-todo-id', todo.id);

            const titleContainer = DOM.createElement('div', ['title-container']);

            const toggleBtn = DOM.createElement(
                'button',
                ['toggle'],
                todo.status ? '\u25cf' : '\u00a0'
            );

            const titleEl = DOM.createElement('div',
                ['title', todo.status ? 'checked' : 'unchecked'],
                todo.title);

            const deleteBtn = DOM.createElement('button', ['delete-todo'], 'x');

            DOM.appendChildren(titleContainer, [toggleBtn, titleEl]);
            DOM.appendChildren(todoEl, [titleContainer, deleteBtn]);
            DOM.appendChildren(todosContainer, [todoEl]);

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

            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                project.toggleTodo(todo.id);

                TodoUI.updateProjectTodos(project);
            })
        })
    }

    static updateProjectTodos(project) {
        const todosContainer = document.querySelector('.todos-container');
        DOM.clearContainer(todosContainer);
        TodoUI.renderProjectTodos(project);
    }

    static deleteTodo(project, todoId) {
        project.deleteTodo(todoId);
        TodoUI.updateProjectTodos(project);
    }
}