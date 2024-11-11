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
}