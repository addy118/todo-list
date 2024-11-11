import { Todo } from "../Todo.js";

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

    static handleModalListeners(dialogClass, triggerClass, cancelClass, formClass, dependencies = [], callbackFn) {
        const dialog = document.querySelector(dialogClass)
        const showDialog = document.querySelector(triggerClass);
        const cancelDialog = document.querySelector(cancelClass);
        const createProject = document.querySelector(formClass);

        showDialog.addEventListener('click', (e) => {
            e.stopPropagation();
            dialog.showModal();
        });

        cancelDialog.addEventListener('click', (e) => {
            e.stopPropagation();
            dialog.close();
        })

        createProject.addEventListener('submit', (e) => {
            e.preventDefault();
            e.stopPropagation();

            callbackFn(dependencies);

            dialog.close();
        })
    }
}