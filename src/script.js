import './style.css'
import { Project } from './Project'
import { Todo } from './Todo';

const general = new Project('General');
console.log(general.todos);

const todo = new Todo('title', 'description', 'tomorrow', 'low')
console.log(todo);