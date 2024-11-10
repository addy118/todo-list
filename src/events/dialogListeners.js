

export function setupProjectFormListeners() {
    const dialog = document.querySelector('.project-dialog')
    const showDialog = document.querySelector('.create-project');
    const cancelDialog = document.querySelector('.project-cancel');
    const createProject = document.querySelector('.project-form');

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

        let projectNameInput = document.getElementById('project-name');
        console.log(projectNameInput.value);
        projectNameInput.value = '';

        dialog.close();
    })
}

export function setupTodoFormListeners() {

}

