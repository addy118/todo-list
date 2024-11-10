// MODAL FOR RENAMING USER
const username = document.querySelector('.username');
const showRenameDialog = document.querySelector('.rename');

const dialog = DOM.createElement('dialog', ['username-dialog']);
const form = DOM.createElement('form', ['username-form']);
form.setAttribute('action', 'script.js');
const formGroup = DOM.createElement('div', ['form-group']);
const label = DOM.createElement('label', [], 'Username: ');
label.setAttribute('for', 'user-name');
const input = DOM.createElement('input', []);
input.setAttribute('type', 'text');
input.setAttribute('name', 'user-name');
input.setAttribute('id', 'user-name');

const renameBtn = DOM.createElement('button', ['rename-user'], 'Rename');
renameBtn.setAttribute('type', 'submit');
const cancelBtn = DOM.createElement('button', ['user-cancel'], 'Cancel');
cancelBtn.setAttribute('type', 'button');

DOM.appendChildren(formGroup, [label, input]);
DOM.appendChildren(form, [formGroup, renameBtn, cancelBtn]);
DOM.appendChildren(dialog, [form]);
DOM.appendChildren(username, [dialog]);

showRenameDialog.addEventListener('click', (e) => {
    e.preventDefault();
    // e.stopPropagation();
    // dialog.showModal();
    console.log('hi')
});

cancelBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    dialog.close();
})

form.addEventListener('submit', (e) => {
    e.preventDefault();
    e.stopPropagation();

    const username = document.getElementById('user-name').value;
})