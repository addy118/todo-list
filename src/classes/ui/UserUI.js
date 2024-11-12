import { User } from "../User.js";
import { Project } from "../Project.js";
import { ProjectUI } from "./ProjectUI.js";
import { todos } from "../../todos.js";
import { DOM } from "./DOM.js";

export class UserUI {
    static renderUser() {
        // create default user
        const defaultUser = new User('User');

        // set username of the user
        const username = document.querySelector('.username>h2');
        username.textContent = defaultUser.name;

        // create modal for adding new projects
        const projectDialog = ProjectUI.createProjectDialog();
        document.body.appendChild(projectDialog);

        // enable modal for creating new projects
        DOM.handleModalListeners(
            'project-dialog',
            'create-project',
            'project-cancel',
            'project-form',
            [defaultUser],
            (dependencies) => {
                const [user] = dependencies;

                // get input 
                let projectNameInput = document.getElementById('project-name');
                const newProject = new Project(projectNameInput.value);

                // add project to user
                user.addProject(newProject);

                // render the new modified user
                ProjectUI.renderProjectTabs(user);

                // clear the previously inputted data
                projectNameInput.value = '';
            })

        // assign the general project of the user to variable
        const general = defaultUser.projects[0];

        //TEST PROJECTS & TODOS 
        // create and add 'Grow' project to user
        general.addTodo(todos[0]);
        general.addTodo(todos[1]);

        const grow = new Project('Grow');
        defaultUser.addProject(grow);
        grow.addTodo(todos[4]);
        grow.addTodo(todos[5]);

        general.toggleTodo(todos[1].id);
        grow.toggleTodo(todos[4].id)

        // initial render of projects & their todos
        ProjectUI.renderProjectTabs(defaultUser);
    }
}