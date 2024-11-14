import { defaultUser } from "../script.js";
import { Local } from "./LocalStorage.js";
import { Todo } from "./Todo.js";

export class Project {
    #id = Math.floor(Date.now() * Math.random())
    #todos = [];

    constructor(name) {
        this.name = name;
    }

    get id() {
        return this.#id;
    }

    set id(localId) {
        this.#id = localId;
    }

    get todos() {
        return this.#todos;
    }

    set todos(localTodos) {
        this.#todos = localTodos;
    }

    addTodo(todo) {
        this.#todos.push(todo);
        Local.save(defaultUser);
    }

    deleteTodo(todoId) {
        const todoIndex = this.#todos.findIndex(todo => todo.id == todoId);
        this.#todos.splice(todoIndex, 1);
        Local.save(defaultUser);
    }

    deleteAllTodos() {
        this.#todos = [];
        Local.save(defaultUser);
    }

    toggleTodo(todoId) {
        const todoIndex = this.#todos.findIndex(todo => todo.id == todoId);
        this.#todos[todoIndex].status == false ?
            this.#todos[todoIndex].status = true :
            this.#todos[todoIndex].status = false;
        Local.save(defaultUser);
    }

    serialize() {
        return {
            id: this.#id,
            name: this.name,
            todos: this.#todos.map(todo => todo.serialize()),
        }
    }

    static deserialize(localProjectObj) {
        const projectInstance = new Project(localProjectObj.name);
        projectInstance.id = localProjectObj.id;
        projectInstance.todos = localProjectObj.todos.map(localTodoObj => Todo.deserialize(localTodoObj));

        return projectInstance;
    }
}