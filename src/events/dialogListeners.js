import { Project } from "../classes/Project.js";
import { ProjectUI } from "../classes/ui/ProjectUI.js";
import { TodoUI } from "../classes/ui/TodoUI.js";
import { User } from "../classes/User.js";


export function setupProjectFormListeners(user) {
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

    createProject.addEventListener('submit', (e) => {
        e.preventDefault();
        e.stopPropagation();

        let projectNameInput = document.getElementById('project-name');
        const newProject = new Project(projectNameInput.value);
        user.addProject(newProject);
        ProjectUI.renderProjectTabs(user)

        TodoUI.renderProjectTodos(user.projects[-1]);
        projectNameInput.value = '';

        dialog.close();
    })
}

export function setupTodoFormListeners() {

}

