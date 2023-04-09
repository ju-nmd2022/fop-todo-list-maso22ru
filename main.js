
const tasks = []

const existingTasks = localStorage.getItem("tasks");
if(existingTasks !== null) {
    const existingTaskArray = JSON.parse(existingTasks);
    for (let i = 0; i < existingTaskArray.length; i++) {
        tasks.push(existingTaskArray[i]);
    }
    render(tasks);
}

function addTask() {
    const inputTextField = document.getElementById("text-add");

    tasks.push(inputTextField.value);
    console.log(tasks);

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    const storageTasks = JSON.stringify(tasks);

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem("tasks", storageTasks);

    render(tasks);
}

function render(myTasks) {
    const taskList = document.getElementById("tasks");
    taskList.innerHTML = "";

    // [1, 2, 3]
    for (let i = 0; i < myTasks.length; i++) {
        const li = document.createElement("li");
        const itemValue = myTasks[i];
        li.textContent = itemValue;
        taskList.appendChild(li);
    }
}


// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
const btn = document.getElementById("button-add");
btn.addEventListener("click", addTask, false);
