import { DOM } from "./DOM.js";
import { Project } from "../Project.js";

export class TodoUI {
    // projectwise todos
    static renderProjectTodos(project) {
        const todosContainer = document.querySelector('.todos-container');
        DOM.clearContainer(todosContainer);

        // handle empty users
        if (!project) {
            console.log('no projects');
            return;
        }

        // handle rendering empty projects
        if (!project.todos.length) {
            console.log('no todos');
            return;
        };

        // rendering project todos
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


            // todo button with event listener for each todo
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                project.toggleTodo(todo.id);

                TodoUI.updateProjectTodos(project);
            })
        });
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

    static createTodoDialog() {
        const todoDialog = DOM.createElement('dialog', ['todo-dialog']);
        const form = DOM.createElement('form', ['todo-form']);

        const titleGroup = DOM.createInput('todo-title', 'Title: ', 'text');
        const descGroup = DOM.createInput('todo-desc', 'Description: ', 'text');
        const dueDateGroup = DOM.createInput('todo-due', 'Due Date: ', 'text', 'DD-MM-YYYY');
        const priorityGroup = DOM.createDropdown('todo-priority', 'Priority: ', [
            { value: '', text: 'Select' },
            { value: 'low', text: 'Low' },
            { value: 'normal', text: 'Normal' },
            { value: 'high', text: 'High' }
        ]);

        const submitButton = DOM.createElement('button', ['create-todo'], 'Create');
        submitButton.setAttribute('type', 'submit');
        const cancelButton = DOM.createElement('button', ['todo-cancel'], 'Cancel');
        cancelButton.setAttribute('type', 'button');

        DOM.appendChildren(form, [titleGroup, descGroup, dueDateGroup, priorityGroup, submitButton, cancelButton]);
        DOM.appendChildren(todoDialog, [form]);

        return todoDialog;
    }

}