import { DOM } from "../classes/ui/DOM.js";
import { ProjectUI } from "../classes/ui/ProjectUI.js";
import { TodoUI } from "../classes/ui/TodoUI.js";

export function handleProjectEvents(user, project, projectEl) {
    const addTodoBtn = DOM.createElement('button', ['create-todo'], '+');
    const deleteProjectBtn = DOM.createElement('button', ['delete-project'], 'x');

    projectEl.addEventListener('click', () => {
        TodoUI.renderProjectTodos(project);
    })

    addTodoBtn.addEventListener('click', () => {
        // todo-add modal
    })

    deleteProjectBtn.addEventListener('click', () => {
        project.deleteAllTodos();
        ProjectUI.deleteProject(user, project.id);
        // TodoUI.renderProjectTodos(user.projects[0]);
    })
}