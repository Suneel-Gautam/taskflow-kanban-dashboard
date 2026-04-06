const toDo = document.querySelector(".to-do");
const progress = document.querySelector(".progress");
const done = document.querySelector(".done");
const addTaskOpenModal = document.querySelector("#addTask");


const todoContainer = document.querySelector('.todoTaskContainer')
const progressContainer = document.querySelector('.progressTaskContainer')
const doneContainer = document.querySelector('.donetaskContainer')


console.log(localStorage.getItem('taskarray'))

function handleSaveLocalStorage(obj) {

    if (localStorage.getItem('taskarray') === null) {
        let taskarry = []
        taskarry.push(obj)
        localStorage.setItem('taskarray', JSON.stringify(taskarry))
    } else {
        let taskarry = JSON.parse(localStorage.getItem('taskarray'))
        taskarry.push(obj)
        localStorage.setItem('taskarray', JSON.stringify(taskarry))
    }
}

let dropElement;

function HandleDragElement(column, container) {
    column.addEventListener("dragover", (e) => {
        e.preventDefault();
    });
    column.addEventListener("dragenter", (e) => {
        e.preventDefault();
        column.classList.add("onEnter");
    });
    column.addEventListener("dragleave", (e) => {
        e.preventDefault();
        column.classList.remove("onEnter");
    });
    column.addEventListener("drop", (e) => {
        e.preventDefault();
        container.append(dropElement);
        column.classList.remove("onEnter");
    });
}

HandleDragElement(toDo, todoContainer);
HandleDragElement(progress, progressContainer);
HandleDragElement(done, doneContainer);

const addContainer = document.querySelector("#addcontainer");
const addTaskButton = document.querySelector("#AddTaskButton");
const closeTaskContainer = document.querySelector("#closeButton");

addTaskOpenModal.addEventListener("click", () => {
    addContainer.style.display = "flex";
});

closeTaskContainer.addEventListener("click", () => {
    addContainer.style.display = "none";
});

const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const errorMessage = document.querySelector(".error");

taskName.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        taskDescription.focus();
    }
});
taskName.addEventListener("input", () => {
    errorMessage.innerHTML = "";
});

addTaskButton.addEventListener("click", () => {
    let taskNameValue = taskName.value.trim();
    let taskDescriptionValue = taskDescription.value.trim();

    if (taskNameValue === "") {
        errorMessage.innerHTML = "Please Enter Task ";
        return;
    }
    handleSaveLocalStorage({
        taskNameValue,
        taskDescriptionValue,
        taskStatus: "Todo",
    });
    displayTaskCard()
    taskName.value = "";
    taskDescription.value = "";
    addContainer.style.display = "none";
});



function displayTaskCard() {

    todoContainer.innerHTML = ""
    let taskarray = JSON.parse(localStorage.getItem('taskarray'))
    taskarray.forEach((Element, index) => {
        const div = document.createElement("div");
        div.draggable = true;
        div.classList.add("task");
        const h2 = document.createElement("h2");
        h2.innerHTML = `${Element.taskNameValue}`;
        div.append(h2);
        const p = document.createElement("p");
        p.innerHTML = `${Element.taskDescriptionValue}`;
        div.append(p);
        const buttonDiv = document.createElement("div");
        div.append(buttonDiv);
        const button = document.createElement("button");
        button.innerHTML = "delete";
        buttonDiv.append(button);
        todoContainer.append(div);


        button.addEventListener('click', () => {
            let array = JSON.parse(localStorage.getItem('taskarray'))
            array.splice(index, 1)
            localStorage.setItem('taskarray', JSON.stringify(array))
            displayTaskCard()
        })
    })

    const tasks = document.querySelectorAll(".task");
    tasks.forEach((task) => {
        task.addEventListener("drag", (e) => {
            dropElement = task;
        });
    });
}



displayTaskCard();
