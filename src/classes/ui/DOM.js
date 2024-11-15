export class DOM {
  // basic dom manipulation
  static createElement(tag, classNames = [], textContent = "") {
    const element = document.createElement(tag);
    element.classList.add(...classNames);
    element.textContent = textContent;
    return element;
  }

  static clearContainer(container) {
    container.innerHTML = "";
  }

  static appendChildren(parent, children = []) {
    // handle single element parameter instead of an array
    if (!Array.isArray(children)) {
      children = [children];
    }

    children.forEach(child => parent.appendChild(child));
  }

  static createInput(id, labelText, inputType, placeholder = "") {
    const formGroup = DOM.createElement("div", ["form-group"]);

    const label = DOM.createElement("label", [], labelText);
    label.setAttribute("for", id);

    const input = DOM.createElement("input", [], "");

    // get today's date in yyyy-MM-dd format
    const today = new Date().toISOString().split("T")[0];

    input.setAttribute("type", inputType);
    input.setAttribute("id", id);
    input.setAttribute("name", id);
    if (placeholder) input.setAttribute("placeholder", placeholder);
    if (inputType == "text") input.setAttribute("required", "");
    if (inputType == "date") {
      input.setAttribute("required", "");
      input.setAttribute("min", today);
    }

    DOM.appendChildren(formGroup, [label, input]);
    return formGroup;
  }

  static createDropdown(id, labelText, options = []) {
    const formGroup = DOM.createElement("div", ["form-group"]);

    const label = DOM.createElement("label", [], labelText);
    label.setAttribute("for", id);

    const select = DOM.createElement("select", []);
    select.setAttribute("id", id);
    select.setAttribute("name", id);
    select.setAttribute("required", "");

    options.forEach(option => {
      const optionElement = DOM.createElement("option", [], option.text);
      optionElement.setAttribute("value", option.value);
      DOM.appendChildren(select, [optionElement]);
    });

    DOM.appendChildren(formGroup, [label, select]);
    return formGroup;
  }

  static handleModalListeners(
    dialogClass,
    triggerClass,
    cancelClass,
    formClass,
    dependencies = [],
    callbackFn
  ) {
    const dialog = document.querySelector("." + dialogClass);
    const showDialog = document.querySelector("." + triggerClass);
    const cancelDialog = document.querySelector("." + cancelClass);
    const createProject = document.querySelector("." + formClass);

    showDialog.addEventListener("click", e => {
      e.stopPropagation();
      dialog.showModal();
    });

    cancelDialog.addEventListener("click", e => {
      e.stopPropagation();
      dialog.close();
    });

    createProject.addEventListener("submit", e => {
      e.preventDefault();
      e.stopPropagation();

      callbackFn(dependencies);

      dialog.close();
    });
  }
}
