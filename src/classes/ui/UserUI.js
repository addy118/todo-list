import { User } from "../User.js";
import { Project } from "../Project.js";
import { ProjectUI } from "./ProjectUI.js";
import { todos } from "../../todos.js";
import { DOM } from "./DOM.js";

export class UserUI {
    static setupUser() {
        // create default user
        const defaultUser = new User('User');

        // set username of the user
        const username = document.querySelector('.username>h2');
        username.textContent = defaultUser.name;

        // create and enable modal for renaming the user
        const usernameDialog = UserUI.createUsernameDialog();
        document.body.appendChild(usernameDialog);

        DOM.handleModalListeners(
            'username-dialog',
            'rename',
            'rename-cancel',
            'username-form',
            [defaultUser],
            (dependencies) => {
                const [user] = dependencies;

                // get input 
                let newUsernameInput = document.getElementById('user-name');

                console.log('triggered rename')

                user.renameUser(newUsernameInput.value);
                UserUI.updateUsername(user);

                console.log(user.name);

                // clear the previously inputted data
                newUsernameInput.value = '';
            })

        // create and enable modal for adding new projects
        const projectDialog = ProjectUI.createProjectDialog();
        document.body.appendChild(projectDialog);

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

    static createUsernameDialog() {
        const usernameDialog = DOM.createElement('dialog', ['username-dialog']);
        const form = DOM.createElement('form', ['username-form']);
        form.setAttribute('action', 'script.js');

        const usernameInput = DOM.createInput('user-name', 'Username: ', 'text');

        const submitButton = DOM.createElement('button', ['rename-user'], 'Create');
        submitButton.setAttribute('type', 'submit');

        const cancelButton = DOM.createElement('button', ['rename-cancel'], 'Cancel');
        cancelButton.setAttribute('type', 'button');

        DOM.appendChildren(form, [usernameInput, submitButton, cancelButton]);
        DOM.appendChildren(usernameDialog, form);

        return usernameDialog;
    }

    static updateUsername(user) {
        const username = document.querySelector('.username>h2');
        username.textContent = user.name;
    }
}