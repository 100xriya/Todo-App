// Feature 1- adding the task to the list 

const list = document.querySelector("#list");
const add = document.querySelector("#addbtn");
const task = document.querySelector("#task");

// store tasks in array; JSON.parse ->convert string → JavaScript data
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// run a loop for every element of task array and run rendertask() through every element
tasks.forEach((task) => renderTask(task));

// on clicking the addbtn
add.addEventListener("click", function () {
    const taskText = task.value.trim();
    if (taskText === "") return;

    // creating task with unique id
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };
    tasks.push(newTask); //pushing the task into array
    saveTasks();
    renderTask(newTask);
    task.value = ""; //clear input
    console.log(tasks);
});

// grabbing each task, giving it id, display task and delete btn 
function renderTask(task) {
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return; //  if event starts with button ->return

        // toggle completed state
        task.completed = !task.completed;
        li.classList.toggle("completed");

        saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
        // EVENT BUBBLING
        e.stopPropagation(); //prevent toggle from firing
        tasks = tasks.filter((t) => t.id !== task.id); // if u use === here it will filter(remove) everything except where i clicked on
        li.remove();
        saveTasks();
    });

    list.appendChild(li);

}

// convert tasks into string using JSON.stringify 
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



