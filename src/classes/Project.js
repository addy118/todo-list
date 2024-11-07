export class Project {
    #todos = [];

    constructor(name) {
        this.name = name;
    }

    get todos() {
        return this.#todos;
    }

    addTodo(todo) {
        this.#todos.push(todo);
    }

    deleteTodo(id) {
        const todoIndex = this.#todos.findIndex(todo => todo.id == id);
        this.#todos.splice(todoIndex, 1);
    }

    toggleTodo(id) {
        const todoIndex = this.#todos.findIndex(todo => todo.id == id);
        this.#todos[todoIndex].status == false ?
            this.#todos[todoIndex].status = true :
            this.#todos[todoIndex].status = false;
    }
}