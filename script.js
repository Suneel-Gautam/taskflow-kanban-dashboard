const toDo = document.querySelector('.to-do')
const progress = document.querySelector('.progress')
const done = document.querySelector('.done')
const tasks = document.querySelectorAll('.task')
const addTask = document.querySelector('#addTask')

let dropElement;

tasks.forEach(task => {
    task.addEventListener('drag', (e) => {
        task.style.opacity = 1
        dropElement = task
    })
})


function HandleDragElement(column) {
    column.addEventListener('dragover', (e) => {
        e.preventDefault()
    })
    column.addEventListener('dragenter', (e) => {
        e.preventDefault()
        column.classList.add('onEnter')
    })
    column.addEventListener('dragleave', (e) => {
        e.preventDefault()
        column.classList.remove('onEnter')
    })
    column.addEventListener('drop', (e) => {
        e.preventDefault()
        column.append(dropElement)
        column.classList.remove('onEnter')
    })
}

HandleDragElement(toDo)
HandleDragElement(progress)
HandleDragElement(done)