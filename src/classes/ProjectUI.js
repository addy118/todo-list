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



            projectEl.addEventListener('click', () => {
                TodoUI.renderProjectTodos(project);
            })

            addTodoBtn.addEventListener('click', () => {
                // todo-add modal
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