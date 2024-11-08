import { User } from './classes/User.js';
import { Project } from './classes/Project.js'
import { Todo } from './classes/Todo.js';
import { DOM } from './classes/DOM.js';

// export function setupTodoFormListeners() {
//     const dialog = document.querySelector('.todo-dialog')
//     const showDialog = document.querySelector('.todo-add');
//     const cancelDialog = document.querySelector('.todo-cancel');
//     const createTodo = document.querySelector('.todo-form');

//     showDialog.addEventListener('click', () => {
//         dialog.showModal();
//     });

//     cancelDialog.addEventListener('click', () => {
//         dialog.close();
//     })

//     createTodo.addEventListener('click', (e) => {
//         e.preventDefault();

//         const title = document.getElementById('todo-title').value;
//         const desc = document.getElementById('todo-desc').value;
//         const dueDate = document.getElementById('todo-due').value;
//         const priority = document.getElementById('todo-priority').value;


//     })
// }

export function setupProjectFormListeners() {
    const dialog = document.querySelector('.project-dialog')
    const showDialog = document.querySelector('.project-add');
    const cancelDialog = document.querySelector('.project-cancel');
    const createProject = document.querySelector('.project-form');

    showDialog.addEventListener('click', () => {
        dialog.showModal();
    });

    cancelDialog.addEventListener('click', () => {
        dialog.close();
    })

    createProject.addEventListener('click', (e) => {
        e.preventDefault();

        const projectName = document.getElementById('project-name').value;
        console.log(projectName);
    })
}

export function setupUsernameFormListeners() {
    const dialog = document.querySelector('.username-dialog')
    const showDialog = document.querySelector('.rename-user');
    const cancelDialog = document.querySelector('.user-cancel');
    const renameUser = document.querySelector('.username-form');

    showDialog.addEventListener('click', () => {
        dialog.showModal();
    });

    cancelDialog.addEventListener('click', () => {
        dialog.close();
    })

    renameUser.addEventListener('click', (e) => {
        e.preventDefault();

        const username = document.getElementById('user-name').value;
        console.log(username);
    })
}