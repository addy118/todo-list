import { UserUI } from './classes/ui/UserUI.js';
import { User } from './classes/User.js';
import { Local } from './classes/LocalStorage.js';

export const defaultUser = Local.load() || new User('User');
UserUI.renderUser(defaultUser);
