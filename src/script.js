import './style.css'
import { Project } from './Project'
import { Todo } from './Todo';

const general = new Project('General');

const todo1 = new Todo("Grocery Shopping", "Buy vegetables, fruits, and essentials.", "2024-11-10", "High");
const todo2 = new Todo("Finish Project Report", "Complete the final report for the project.", "2024-11-12", "Medium");
const todo3 = new Todo("Workout", "Go for a run and strength training session.", "2024-11-08", "Low");
const todo4 = new Todo("Read Book", "Read 50 pages of the assigned novel.", "2024-11-09", "Low");

general.addTodo(todo1);
general.addTodo(todo2);
general.addTodo(todo3);
general.addTodo(todo4);

general.deleteTodo(todo2.id);
console.log(general.todos);

general.toggleTodo(todo3.id);