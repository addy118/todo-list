export class Project {
    #todos = [];

    constructor(name) {
        this.name = name;
    }

    get todos() {
        return this.#todos;
    }

    addTodo(todo) {
        return;
    }

    deleteTodo(id) {
        return;
    }
}