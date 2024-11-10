import { Todo } from "./Todo.js";

export class DOM {
    // basic dom manipulation
    static createElement(tag, classNames = [], textContent = '') {
        const element = document.createElement(tag);
        element.classList.add(...classNames);
        element.textContent = textContent;
        return element;
    }

    static clearContainer(container) {
        container.innerHTML = '';
    }

    static appendChildren(parent, children) {
        children.forEach(child => parent.appendChild(child));
    }
}