import { User } from './classes/User.js';
import { Project } from './classes/Project.js'
import { Todo } from './classes/Todo.js';
import { DOM } from './classes/DOM.js';

export function setupProjectFormListeners() {
    const dialog = document.querySelector('.project-dialog')
    const showDialog = document.querySelector('.create-project');
    const cancelDialog = document.querySelector('.project-cancel');
    const createProject = document.querySelector('.project-form');

    showDialog.addEventListener('click', (e) => {
        e.stopPropagation();
        dialog.showModal();
    });

    cancelDialog.addEventListener('click', (e) => {
        e.stopPropagation();
        dialog.close();
    })

    createProject.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();

        const projectName = document.getElementById('project-name').value;
        console.log(projectName);
    })
}

