import { Todo } from "./Todo.js";

export class DOM {
    // basic dom manipulation
    static createElement(tag, classNames = [], textContent = '') {
        const element = document.createElement(tag);
        element.classList.add(...classNames);
        element.textContent = textContent;
        return element;
    }

    static clearContainer(container) {
        container.innerHTML = '';
    }

    static appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }


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

            form.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();

                const username = document.getElementById('user-name').value;
                console.log(username);
            })
            // <dialog class="username-dialog">
            //     <form action="script.js" class="username-form">
            //         <div class="form-group">
            //             <label for="user-name">Username: </label>
            //             <input type="text" name="user-name" id="user-name">
            //         </div>

            //         <button type="submit" class="rename-user">Rename</button>
            //         <button type="button" class="user-cancel">Cancel</button>
            //     </form>
            // </dialog>

            // event-listeners
            projectEl.addEventListener('click', () => {
                DOM.renderProjectTodos(project);
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
                    DOM.renderProjectTodos(project);

                    dialog.close();
                })
            })

            deleteProjectBtn.addEventListener('click', () => {
                DOM.deleteProject(user, project.id);
            })
        })
    }

    static updateProjectTabs(user) {
        const projectsContainer = document.querySelector('.projects-container');
        DOM.clearContainer(projectsContainer);
        this.renderProjectTabs(user);
    }

    static deleteProject(user, projectId) {
        user.deleteProject(projectId);
        DOM.updateProjectTabs(user);
    }


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
                DOM.deleteTodo(project, todoId);
            })

            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                project.toggleTodo(todo.id);

                DOM.updateProjectTodos(project);
            })
        })
    }

    static updateProjectTodos(project) {
        const todosContainer = document.querySelector('.todos-container');
        DOM.clearContainer(todosContainer);
        DOM.renderProjectTodos(project);
    }

    static deleteTodo(project, todoId) {
        project.deleteTodo(todoId);
        DOM.updateProjectTodos(project);
    }
}