import "./styles/style.css";
import "./styles/projects.css";
import "./styles/todos.css";
import "./styles/modal.css";

import { UserUI } from "./classes/ui/UserUI.js";
import { User } from "./classes/User.js";
import { Local } from "./classes/LocalStorage.js";

export const defaultUser = Local.load() || new User("User");
UserUI.renderUser(defaultUser);
