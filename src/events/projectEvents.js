import { DOM } from "../classes/ui/DOM.js";
import { ProjectUI } from "../classes/ui/ProjectUI.js";
import { TodoUI } from "../classes/ui/TodoUI.js";

export function handleProjectEvents(user, project, projectEl, addTodoBtn, deleteProjectBtn) {
    projectEl.addEventListener('click', (e) => {
        e.stopPropagation();
        TodoUI.renderProjectTodos(project);
    })

    addTodoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // modal for creating new todo logic
    })

    deleteProjectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // delete all todos of project
        project.deleteAllTodos();

        // remove project tab from panel
        ProjectUI.deleteProject(user, project.id);

        // console.log(user.projects.map(project => project.name));
    })
}