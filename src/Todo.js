export class Todo {
    #id = Math.floor(Date.now() * Math.random());
    status = false;

    constructor(title, desc, dueDate, priority) {
        this.title = title;
        this.desc = desc;
        this.dueDate = dueDate;
        this.priority = priority;
    }

    get id() {
        return this.#id;
    }
}