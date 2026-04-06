const toDo = document.querySelector('.to-do')
const progress = document.querySelector('.progress')
const done = document.querySelector('.done')
const addTaskOpenModal = document.querySelector('#addTask')

let dropElement;

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



const addContainer = document.querySelector('#addcontainer')
const addTaskButton = document.querySelector('#AddTaskButton')
const closeTaskContainer = document.querySelector('#closeButton')

addTaskOpenModal.addEventListener('click', () => {
    addContainer.style.display = 'flex'
})

closeTaskContainer.addEventListener('click', () => {
    addContainer.style.display = 'none'
})

const taskName = document.querySelector('#taskName')
const taskDescription = document.querySelector('#taskDescription')
const errorMessage = document.querySelector('.error')

taskName.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        taskDescription.focus()
    }

})

addTaskButton.addEventListener('click', () => {
    let taskNameValue = taskName.value.trim()
    let taskDescriptionValue = taskDescription.value.trim()

    if (taskNameValue === "") {
        errorMessage.innerHTML = 'Please Enter Task '
        return
    }
    displayTaskCard({
        taskNameValue,
        taskDescriptionValue
    })
    taskName.value = ''
    taskDescription.value = ''
    addContainer.style.display = 'none'

})

function displayTaskCard(obj) {
    const div = document.createElement('div')
    div.draggable = true
    div.classList.add('task')
    const h2 = document.createElement('h2')
    h2.innerHTML = `${obj.taskNameValue}`
    div.append(h2)
    const p = document.createElement('p')
    p.innerHTML = `${obj.taskDescriptionValue}`
    div.append(p)
    const buttonDiv = document.createElement('div')
    div.append(buttonDiv)
    const button = document.createElement('button')
    button.innerHTML = 'delete'
    buttonDiv.append(button)
    toDo.append(div)


    const tasks = document.querySelectorAll('.task')
    tasks.forEach(task => {
        task.addEventListener('drag', (e) => {
            dropElement = task
        })
    })



}

displayTaskCard()



