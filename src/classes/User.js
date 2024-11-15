import { Local } from "./LocalStorage.js";
import { Project } from "./Project.js";

export class User {
  #projects = [new Project("General")];

  constructor(name) {
    this.name = name;
  }

  renameUser(name) {
    this.name = name;
    Local.save(this);
  }

  get projects() {
    return this.#projects;
  }

  set projects(localProjects) {
    this.#projects = localProjects;
  }

  addProject(project) {
    this.#projects.push(project);
    Local.save(this);
  }

  deleteProject(projectId) {
    const projectIndex = this.#projects.findIndex(
      project => project.id == projectId
    );
    this.#projects.splice(projectIndex, 1);
    Local.save(this);
  }
}
