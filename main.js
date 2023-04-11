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

    tasks.push({
        description: inputTextField.value,
        done: false
    })
    saveTasks(tasks);
    render(tasks);
}

function saveTasks(tasksToSave) {
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify
    const storageTasks = JSON.stringify(tasksToSave);

    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    localStorage.setItem("tasks", storageTasks);
}

function render(myTasks) {
    const taskList = document.getElementById("tasks");
    //clears the list
    taskList.innerHTML = "";

    for (let i = 0; i < myTasks.length; i++) {
        const li = document.createElement("li"); // <li></li>
        const itemValue = myTasks[i].description; // value

        const div = document.createElement("div");

        const label = document.createElement("label");
        // https://www.w3schools.com/jsref/prop_label_htmlfor.asp
        label.htmlFor = itemValue;
        label.textContent = itemValue;

        if (myTasks[i].done === true) {
            label.classList.add("checked-text");
        }

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.name = itemValue;
        checkbox.checked = myTasks[i].done;

        checkbox.onchange = function() {
            label.classList.toggle("checked-text");

            const currentStatus = tasks[i].done;
            if (currentStatus === false) {
                tasks[i].done = true;
            } else {
                tasks[i].done = false;
            }

            saveTasks(tasks);
        }
        
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";

        deleteButton.onclick = function() {
            tasks.splice(i, 1);
            render(tasks);
            saveTasks(tasks);
        }

        div.appendChild(label);
        div.appendChild(checkbox);
        div.appendChild(deleteButton);

        li.appendChild(div);

        taskList.appendChild(li); // <ul><li>value</li></ul>
    }
}

// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
const btn = document.getElementById("button-add");
btn.addEventListener("click", addTask, false);
