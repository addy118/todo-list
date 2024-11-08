import { User } from './classes/User.js';
import { Project } from './classes/Project.js'
import { Todo } from './classes/Todo.js';
import { DOM } from './classes/DOM.js';
import { setupProjectFormListeners } from './modals.js';


const addy = new User('Addy');
const username = document.querySelector('.username>h2');
username.textContent = addy.name;

const general = addy.projects[0];

const grow = new Project('Grow');
addy.addProject(grow);

const todo1 = new Todo("Grocery Shopping", "Buy vegetables, fruits, and essentials.", "2024-11-10", "High");
const todo2 = new Todo("Finish Project Report", "Complete the final report for the project.", "2024-11-12", "Medium");
const todo3 = new Todo("Workout", "Go for a run and strength training session.", "2024-11-08", "Low");
const todo4 = new Todo("Read Book", "Read 50 pages of the assigned novel.", "2024-11-09", "Low");

general.addTodo(todo1);
general.addTodo(todo2);

grow.addTodo(todo3);
grow.addTodo(todo4);


general.toggleTodo(todo2.id);

DOM.renderProjectTodos(grow);
DOM.renderProjectTodos(general);

DOM.renderProjectTabs(addy);

// setupTodoFormListeners();
setupProjectFormListeners();
// setupUsernameFormListeners();