import { DOM } from "./DOM.js";
import { Todo } from "../Todo.js";
import { format } from "../../node_modules/date-fns/format.js";

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

            // priority styles for todoEl
            // #FA4032, #FAB12F, #A1DD70
            if (todo.priority.toLowerCase() === 'normal') {
                todoEl.style.borderColor = '#FAB12F';
            } else if (todo.priority.toLowerCase() === 'low') {
                todoEl.style.borderColor = '#A1DD70';
            } else {
                todoEl.style.borderColor = '#FA4032'
            }

            const titleContainer = DOM.createElement('div', ['title-container']);

            const toggleBtn = DOM.createElement(
                'button',
                ['toggle'],
                todo.status ? '\u2714' : '\u00a0'
            );

            const titleEl = DOM.createElement('div',
                ['title', todo.status ? 'checked' : 'unchecked'],
                todo.title);

            // formatting the date to render
            console.log(todo.dueDate, new Date(todo.dueDate));
            const dueDateObj = new Date(todo.dueDate);

            const date = format(dueDateObj, 'd');
            const month = format(dueDateObj, 'MMM');
            const year = format(dueDateObj, 'yyyy');

            function getDaySuffix(day) {
                if (day > 3 && day < 21) {
                    return 'th'; // For 4-20, use "th"
                }
                switch (day % 10) {
                    case 1: return 'st';
                    case 2: return 'nd';
                    case 3: return 'rd';
                    default: return 'th';
                }
            }

            const formattedDueDate = `${date}${getDaySuffix(date)} ${month}, ${year}`;
            console.log(formattedDueDate);

            const dateEl = DOM.createElement('div', ['due-date'], formattedDueDate);

            const deleteBtn = DOM.createElement('button', ['delete-todo'], '\u00d7');

            const buttonsContainer = DOM.createElement('div', ['buttons-container']);

            DOM.appendChildren(titleContainer, [toggleBtn, titleEl]);
            DOM.appendChildren(buttonsContainer, [dateEl, deleteBtn]);
            DOM.appendChildren(todoEl, [titleContainer, buttonsContainer]);
            DOM.appendChildren(todosContainer, [todoEl]);

            const todoExpandDialog = TodoUI.createTodoExpandDialog(todo);
            DOM.appendChildren(todoEl, [todoExpandDialog]);

            // enable view button for each todo
            todoEl.addEventListener('click', (e) => {
                e.stopPropagation();

                console.log('view todo ' + todo.title);
                todoExpandDialog.showModal();
            })

            // enable toggle button for each todo
            toggleBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                project.toggleTodo(todo.id);


                TodoUI.updateProjectTodos(project);
            })

            // enable delete todo button for each todo
            deleteBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                console.log('triggered delete todo on ' + todo.title);

                project.deleteTodo(todo.id)
                console.log(project.todos);
                TodoUI.renderProjectTodos(project);
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

    static createTodoDialog(project) {
        const todoDialog = DOM.createElement('dialog', ['todo-dialog']);
        const form = DOM.createElement('form', ['todo-form']);

        const titleGroup = DOM.createInput('todo-title', 'Title: ', 'text');
        const descGroup = DOM.createInput('todo-desc', 'Description: ', 'text');
        const dueDateGroup = DOM.createInput('todo-due', 'Due Date: ', 'date');
        const priorityGroup = DOM.createDropdown('todo-priority', 'Priority: ', [
            { value: '', text: 'Select' },
            { value: 'Low', text: 'Low' },
            { value: 'Normal', text: 'Normal' },
            { value: 'High', text: 'High' }
        ]);

        const modalButtons = DOM.createElement('div', ['modal-buttons']);
        const submitButton = DOM.createElement('button', ['create-todo'], 'Create');
        submitButton.setAttribute('type', 'submit');
        const cancelButton = DOM.createElement('button', ['todo-cancel'], 'Cancel');
        cancelButton.setAttribute('type', 'button');
        DOM.appendChildren(modalButtons, [submitButton, cancelButton]);

        // setting default values for testing
        // titleGroup.querySelector('input').value = '';
        descGroup.querySelector('input').value = 'None';
        dueDateGroup.querySelector('input').value = '2024-11-14';
        priorityGroup.querySelector('select').value = 'Normal';

        DOM.appendChildren(form, [titleGroup, descGroup, dueDateGroup, priorityGroup, modalButtons]);
        DOM.appendChildren(todoDialog, [form]);


        // MODAL LOGIC
        cancelButton.addEventListener('click', () => todoDialog.close());

        // enable submit new todo button for each todo
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            console.log('trigger count');

            const title = titleGroup.querySelector('input').value;
            const desc = descGroup.querySelector('input').value;
            const dueDate = dueDateGroup.querySelector('input').value;
            const priority = priorityGroup.querySelector('select').value;

            const newTodo = new Todo(title, desc, dueDate, priority);
            project.addTodo(newTodo);
            this.renderProjectTodos(project);

            // console.log(project.todos);


            // clear the input fields
            titleGroup.querySelector('input').value = '';
            // descGroup.querySelector('input').value = '';
            dueDateGroup.querySelector('input').value = '14-11-2024';
            // priorityGroup.querySelector('select').value = '';

            todoDialog.close();
        });

        // to close modal on clicking outside of it
        todoDialog.addEventListener("click", (e) => {
            e.stopPropagation();
            const rect = todoDialog.getBoundingClientRect();

            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                todoDialog.close();
            }
        });

        return todoDialog;
    }

    static createTodoExpandDialog(todo) {
        const todoExpandDialog = DOM.createElement('dialog', ['todo-expand']);
        const todoDetails = DOM.createElement('div', ['todo-details']);

        const titleExpand = DOM.createElement('div', ['title-expand']);
        const titleLabel = DOM.createElement('b', [], 'Title: ');
        const titleContent = DOM.createElement('span', [], todo.title);
        DOM.appendChildren(titleExpand, [titleLabel, titleContent]);

        const descExpand = DOM.createElement('div', ['desc-expand']);
        const descLabel = DOM.createElement('b', [], 'Description: ');
        const descContent = DOM.createElement('span', [], todo.desc);
        DOM.appendChildren(descExpand, [descLabel, descContent]);

        const dueExpand = DOM.createElement('div', ['due-expand']);
        const dueLabel = DOM.createElement('b', [], 'Due: ');
        const dueContent = DOM.createElement('span', [], todo.dueDate);
        DOM.appendChildren(dueExpand, [dueLabel, dueContent]);

        const priorityExpand = DOM.createElement('div', ['priority-expand']);
        const priorityLabel = DOM.createElement('b', [], 'Priority: ');
        const priorityContent = DOM.createElement('span', [], todo.priority);
        DOM.appendChildren(priorityExpand, [priorityLabel, priorityContent]);

        const cancelButton = DOM.createElement('button', ['todo-expand-cancel'], 'Cancel');
        cancelButton.setAttribute('type', 'button');

        DOM.appendChildren(todoDetails, [titleExpand, descExpand, dueExpand, priorityExpand]);
        DOM.appendChildren(todoExpandDialog, [todoDetails, cancelButton]);

        cancelButton.addEventListener('click', (e) => {
            e.stopPropagation();
            todoExpandDialog.close();
        })

        // to close modal on clicking outside of it
        todoExpandDialog.addEventListener("click", (e) => {
            e.stopPropagation();
            const rect = todoExpandDialog.getBoundingClientRect();

            if (
                e.clientX < rect.left ||
                e.clientX > rect.right ||
                e.clientY < rect.top ||
                e.clientY > rect.bottom
            ) {
                todoExpandDialog.close();
            }
        });

        return todoExpandDialog;
    }
}