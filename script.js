import { Todo } from './classes/Todo.js';
import { UserUI } from './classes/ui/UserUI.js';

const defaultUser = UserUI.setupUser();

// checks for todo
const expTodo = defaultUser.projects[0].todos[0];
console.groupCollapsed('Todo');
console.log(expTodo);
console.log(expTodo.serialize());
console.log(Todo.deserialize(expTodo.serialize()));
console.groupEnd();