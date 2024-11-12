e.stopPropagation();

const modal = document.querySelector('.todo-dialog');
modal.close();

DOM.handleModalListeners(
    'todo-dialog',
    'create-todo',
    'todo-cancel',
    'todo-form',
    [user, project],
    (dependencies) => {
        console.log('hi')
        // const [user, project] = dependencies;
        // console.log(user.name, project.name);
    })