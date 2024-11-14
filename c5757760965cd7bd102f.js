export class Todo {
    #id = Math.floor(Date.now() * Math.random());
    status = false;

    constructor(title, desc, dueDate, dueTime, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.dueTime = dueTime;
        this.priority = priority;
    }

    get id() {
        return this.#id;
    }

    set id(localId) {
        this.#id = localId;
    }

    serialize() {
        return {
            id: this.#id,
            status: this.status,
            title: this.title,
            desc: this.desc,
            dueDate: this.dueDate,
            dueTime: this.dueTime,
            priority: this.priority,
        }
    }

    static deserialize(localTodoObj) {
        const todo = new Todo(localTodoObj.title,
            localTodoObj.desc,
            localTodoObj.dueDate,
            localTodoObj.dueTime,
            localTodoObj.priority,
        );
        todo.id = localTodoObj.id;
        todo.status = localTodoObj.status;

        return todo;
    }
}