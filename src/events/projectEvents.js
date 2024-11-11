import { DOM } from "../classes/ui/DOM.js";
import { ProjectUI } from "../classes/ui/ProjectUI.js";
import { TodoUI } from "../classes/ui/TodoUI.js";

export function handleProjectEvents(dependencies = [], eventTriggerers = []) {
    const [user, project] = dependencies;
    const [projectEl, addTodoBtn, deleteProjectBtn] = eventTriggerers;

    projectEl.addEventListener('click', (e) => {
        e.stopPropagation();
        TodoUI.renderProjectTodos(project);
    })

    addTodoBtn.addEventListener('click', (e) => {
        e.stopPropagation();

        // DOM.handleModalListeners(
        //     '.project-dialog',
        //     '.create-project',
        //     '.project-cancel',
        //     '.project-form',
        //     [addy],
        //     (dependencies) => {
        //         const [user] = dependencies;

        //         // get input 
        //         let projectNameInput = document.getElementById('project-name');
        //         const newProject = new Project(projectNameInput.value);

        //         // add project to user
        //         user.addProject(newProject);

        //         // render the new modified user
        //         ProjectUI.renderProjectTabs(user);

        //         // clear the previously inputted data
        //         projectNameInput.value = '';
        //     })
    })

    deleteProjectBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        // delete all todos of project
        project.deleteAllTodos();

        // remove project tab from panel
        ProjectUI.deleteProject(user, project.id);
        console.log(user.projects.map(project => project.name));
    })
}