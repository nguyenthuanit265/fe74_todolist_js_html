const taskList = new TaskList();
const objectUtils = new ObjectUtils();
const collectionUtils = new CollectionUtils();
const todoResponse = new TodoResponse();

function domById(id) {
    return document.getElementById(id);
}

function showError(id, message) {
    domById(id).innerHTML = `<span>${message}</span>`
    domById(id).style.display = "block"
}

function hideError(id, message) {
    domById(id).innerHTML = ''
    domById(id).style.display = "none"
}

function saveLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
}

function getLocalStorage(key) {
    return JSON.parse(localStorage.getItem(key))
}

function generateId() {
    let id = Number(localStorage.getItem("id"));
    if (objectUtils.isEmpty(id)) {
        id = 1;
        localStorage.setItem("id", id);
        return id;
    } else {
        id += 1
        localStorage.setItem("id", id);
        return id;
    }
}

function renderTodoList(data) {
    let contentTodoTask = '';
    let contentCompletedTask = '';

    if (collectionUtils.isEmpty(data)) {
        data = []
    }

    for (let element of data) {
        if (element.status === Constant.TaskStatus.STATUS_TODO) {
            contentTodoTask += `
        <li>
                    <span>${element.name}</span>
                    <div class="buttons">
                        <button class="remove" data-index="0" data-status="todo" onclick="deleteToDo(${element.id})">
                            <i class="fa fa-trash-alt"></i>
                        </button>
                        <button class="complete" data-index="0" data-status="todo" onclick="completeToDo(${element.id})">
                            <i class="far fa-check-circle"></i>
                            <i class="fas fa-check-circle"></i>
                        </button>
                    </div>
        </li>
        
        `
        } else if (element.status === Constant.TaskStatus.STATUS_COMPLETED) {
            contentCompletedTask += `
        <li>
            <span>${element.name}</span>
            <div class="buttons">
                <button class="remove" data-index="0" data-status="completed" onclick="deleteToDo(${element.id})">
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="complete" data-index="0" data-status="completed" onclick="completeToDo(${element.id})">
                    <i class="far fa-check-circle"></i>
                    <i class="fas fa-check-circle"></i>
                </button>
            </div>
        </li>
        
        `
        }
    }

    domById("todo").innerHTML = contentTodoTask
    domById("completed").innerHTML = contentCompletedTask
}

domById("newTask").addEventListener("keyup", function () {
    let nameTask = domById("newTask").value;
    if (!objectUtils.isEmpty(nameTask)) {
        hideError("notiInput", null);
    }
})

/**
 * Add task
 * 
*/
domById("addItem").addEventListener("click", function () {
    let nameTask = domById("newTask").value;
    let indexExist = taskList.findByName(nameTask)
    if (indexExist > -1) {
        showError("notiInput", "Activity is existed. Try again !!!");
        return;
    }

    if (objectUtils.isEmpty(nameTask)) {
        showError("notiInput", "Activity is empty");
        return;
    }

    const response = taskList.addTask(new Task(generateId(), nameTask, Constant.TaskStatus.STATUS_TODO))
    console.log(response);
    if (response.isError) {
        showError("notiInput", "Cannot add task");
    }

    // clear input 
    domById("newTask").value = ''

    // save localStorage
    saveLocalStorage("tasks", taskList.getAll())

    // Render todo list
    renderTodoList(taskList.getAll())
})

/**
 * Complete task
 * */
function completeToDo(taskId) {
    const index = taskList.findIndexById(taskId)
    if (index > -1) {
        if (taskList.arr[index].status === Constant.TaskStatus.STATUS_COMPLETED) {
            taskList.arr[index].status = Constant.TaskStatus.STATUS_TODO
        } else if (taskList.arr[index].status === Constant.TaskStatus.STATUS_TODO) {
            taskList.arr[index].status = Constant.TaskStatus.STATUS_COMPLETED
        }

        // Save storage
        saveLocalStorage("tasks", taskList.arr)

        // Render
        renderTodoList(getLocalStorage("tasks"))
    }
}

/**
 * Delete toDo
 * */
function deleteToDo(taskId) {
    const index = taskList.findIndexById(taskId)
    if (index > -1) {
        taskList.arr.splice(index, 1)

        // Save storage
        saveLocalStorage("tasks", taskList.arr)

        // Render
        renderTodoList(getLocalStorage("tasks"))
    }
}

renderTodoList(getLocalStorage("tasks"))
