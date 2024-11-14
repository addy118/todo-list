import { Project } from "./Project.js";

export class User {
    #projects = [new Project('General')]

    constructor(name) {
        this.name = name;
    }

    renameUser(name) {
        this.name = name;
    }

    get projects() {
        return this.#projects;
    }

    set projects(localProjects) {
        this.#projects = localProjects;
    }

    addProject(project) {
        this.#projects.push(project);
    }

    deleteProject(projectId) {
        const projectIndex = this.#projects.findIndex(project => project.id == projectId);
        this.#projects.splice(projectIndex, 1);
    }

    saveToLocalStorage() {
        const userData = {
            name: this.name,
            projects: this.#projects.map(projectInstance => projectInstance.serialize()),
        };

        localStorage.setItem('user', JSON.stringify(userData));
    }

    static loadFromLocalStorage() {
        const userData = JSON.parse(localStorage.getItem('user'));

        // if data exists in local storage
        if (userData) {
            const localProjects = userData.projects.map(projectObj => Project.deserialize(projectObj));
            const userName = userData.name;

            const localUser = new User(userName);
            localUser.projects = localProjects;

            console.log('loaded from local storage')
            return localUser;
        }

        // if data doesn't exists in local storage
        return null;
    }
}