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

    addProject(project) {
        this.#projects.push(project);
    }

    deleteProject(projectId) {
        const projectIndex = this.#projects.findIndex(project => project.id == projectId);
        this.#projects.splice(projectIndex, 1);
    }
}