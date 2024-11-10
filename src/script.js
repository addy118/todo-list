import { User } from './classes/User.js';
import { Project } from './classes/Project.js'
import { Todo } from './classes/Todo.js';
import { DOM } from './classes/ui/DOM.js';
import { setupProjectFormListeners } from './events/dialogListeners.js';
import { TodoUI } from './classes/ui/TodoUI.js';
import { ProjectUI } from './classes/ui/ProjectUI.js';

// create dummy todos
const todo1 = new Todo("Grocery Shopping", "Buy vegetables, fruits, and essentials.", "2024-11-10", "High");
const todo2 = new Todo("Finish Project Report", "Complete the final report for the project.", "2024-11-12", "Medium");
const todo3 = new Todo("Workout", "Go for a run and strength training session.", "2024-11-08", "Low");
const todo4 = new Todo("Read Book", "Read 50 pages of the assigned novel.", "2024-11-09", "Low");

// create new user named 'Addy'
const addy = new User('Addy');
const username = document.querySelector('.username>h2');
// set username of the user
username.textContent = addy.name;

// assign the general project of the user to variable
const general = addy.projects[0];

// create and add 'Grow' project to user
const grow = new Project('Grow');
addy.addProject(grow);

// add two todos to project 'General'
general.addTodo(todo1);
general.addTodo(todo2);

// add two todos to project 'Grow'
grow.addTodo(todo3);
grow.addTodo(todo4);

// change the status to second todo in project 'General'
general.toggleTodo(todo2.id);

// todos for their corresponding projects should render by this method only
// don't use renderProjectTodos() method to render todos seperately!
ProjectUI.renderProjectTabs(addy);

// TodoUI.renderProjectTodos(grow);
// TodoUI.renderProjectTodos(general);

// console.log(grow.todos);
// grow.deleteAllTodos();
// console.log(grow.todos);


// setupTodoFormListeners();
setupProjectFormListeners();
// setupUsernameFormListeners();