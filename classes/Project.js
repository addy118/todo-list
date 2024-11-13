export class Project {
    #id = Math.floor(Date.now() * Math.random())
    #todos = [];

    constructor(name) {
        this.name = name;
    }

    get id() {
        return this.#id;
    }

    get todos() {
        return this.#todos;
    }

    addTodo(todo) {
        this.#todos.push(todo);
    }

    deleteTodo(todoId) {
        const todoIndex = this.#todos.findIndex(todo => todo.id == todoId);
        this.#todos.splice(todoIndex, 1);
    }

    deleteAllTodos() {
        this.#todos = [];
    }

    toggleTodo(todoId) {
        const todoIndex = this.#todos.findIndex(todo => todo.id == todoId);
        this.#todos[todoIndex].status == false ?
            this.#todos[todoIndex].status = true :
            this.#todos[todoIndex].status = false;
    }
}