import { Project } from "./Project.js";
import { User } from "./User.js";

export class Local {
  static save(userInstance) {
    const userData = {
      name: userInstance.name,
      projects: userInstance.projects.map(projectInstance =>
        projectInstance.serialize()
      ),
    };

    localStorage.setItem("user", JSON.stringify(userData));
  }

  static load() {
    const userData = JSON.parse(localStorage.getItem("user"));

    // if data exists in local storage
    if (userData) {
      const localProjects = userData.projects.map(projectObj =>
        Project.deserialize(projectObj)
      );
      const userName = userData.name;

      const localUser = new User(userName);
      localUser.projects = localProjects;

      console.log("loaded from local storage");
      return localUser;
    }

    // if data doesn't exists in local storage
    return null;
  }
}
