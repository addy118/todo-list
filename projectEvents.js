import { DOM } from "./classes/ui/DOM.js";
import { ProjectUI } from "./classes/ui/ProjectUI.js";
import { TodoUI } from "./classes/ui/TodoUI.js";

export function handleProjectEvents(dependencies = [], eventTriggerers = []) {
    const [user, project] = dependencies;
    const [projectEl, deleteProjectBtn] = eventTriggerers;

    // show all the todos of the project 
    projectEl.addEventListener('click', (e) => {
        e.stopPropagation();
        TodoUI.renderProjectTodos(project);
    })

    // delete the entire project
    deleteProjectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // delete all todos of project
        project.deleteAllTodos();

        // remove project tab from panel
        ProjectUI.deleteProject(user, project.id);
        console.log(user.projects.map(project => project.name));
    })
}