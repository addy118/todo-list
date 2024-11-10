import { DOM } from "./DOM.js";
import { Todo } from "./Todo.js";
import { TodoUI } from "./TodoUI.js";

export class ProjectUI {
    // userwise project tabs
    static renderProjectTabs(user) {
        const projectsContainer = document.querySelector('.projects-container');
        DOM.clearContainer(projectsContainer);

        user.projects.forEach(project => {
            const projectEl = DOM.createElement('div', ['project']);
            projectEl.setAttribute('data-project-id', project.id);

            const projectName = DOM.createElement('div', ['project-name'], project.name);
            const buttonsContainer = DOM.createElement('div', ['buttons-container']);
            const addTodoBtn = DOM.createElement('button', ['create-todo'], '+');
            const deleteProjectBtn = DOM.createElement('button', ['delete-project'], 'x');

            DOM.appendChildren(buttonsContainer, [addTodoBtn, deleteProjectBtn]);
            DOM.appendChildren(projectEl, [projectName, buttonsContainer]);
            DOM.appendChildren(projectsContainer, [projectEl]);

            // MODAL FOR RENAMING USER
            const username = document.querySelector('.username');
            const showRenameDialog = document.querySelector('.rename');

            const dialog = DOM.createElement('dialog', ['username-dialog']);
            const form = DOM.createElement('form', ['username-form']);
            form.setAttribute('action', 'script.js');
            const formGroup = DOM.createElement('div', ['form-group']);
            const label = DOM.createElement('label', [], 'Username: ');
            label.setAttribute('for', 'user-name');
            const input = DOM.createElement('input', []);
            input.setAttribute('type', 'text');
            input.setAttribute('name', 'user-name');
            input.setAttribute('id', 'user-name');

            const renameBtn = DOM.createElement('button', ['rename-user'], 'Rename');
            renameBtn.setAttribute('type', 'submit');
            const cancelBtn = DOM.createElement('button', ['user-cancel'], 'Cancel');
            cancelBtn.setAttribute('type', 'button');

            DOM.appendChildren(formGroup, [label, input]);
            DOM.appendChildren(form, [formGroup, renameBtn, cancelBtn]);
            DOM.appendChildren(dialog, [form]);
            DOM.appendChildren(username, [dialog]);

            showRenameDialog.addEventListener('click', (e) => {
                e.preventDefault();
                // e.stopPropagation();
                // dialog.showModal();
                console.log('hi')
            });

            cancelBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                dialog.close();
            })

            form.addEventListener('submit', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const username = document.getElementById('user-name').value;
            })

            projectEl.addEventListener('click', () => {
                TodoUI.renderProjectTodos(project);
            })

            addTodoBtn.addEventListener('click', () => {
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
            })

            deleteProjectBtn.addEventListener('click', () => {
                ProjectUI.deleteProject(user, project.id);
                project.deleteAllTodos();
            })
        })
    }

    static updateProjectTabs(user) {
        const projectsContainer = document.querySelector('.projects-container');
        DOM.clearContainer(projectsContainer);
        ProjectUI.renderProjectTabs(user);
    }

    static deleteProject(user, projectId) {
        user.deleteProject(projectId);
        ProjectUI.updateProjectTabs(user);
    }
}