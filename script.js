// Feature 1- adding the task to the list 

const list = document.querySelector("#list");
const add = document.querySelector("#addbtn");
const task = document.querySelector("#task");

let tasks = JSON.parse(localStorage.getItem("tasks"));

// display previously saved tasks
tasks.forEach((task) => renderTask(task));

// on clicking the addbtn
add.addEventListener("click", function () {
    const taskText = task.value.trim();
    if (task.value.trim() !== "") return;

    // creating task with unique id
    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    task.value = ""; //clear input
    console.log(tasks);
});

function renderTask(task) {
    const li = document.createElement("li")
    if (task.completed) li.classList.add("completed");
    li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
    `;
    li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return;
        task.completed = !task.completed;
        li.classList.toggle("completed");
        saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation(); //prevent toggle from firing
        tasks = tasks.filter((t) => t.id === task.id);
        li.remove();
        saveTasks();
    });

    list.appendChild(li);

}

function saveTaasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


/*  V1.0 codes 
// create task
 const li = document.createElement("li")
 li.textContent = task.value;
 li.classList.add("flex", "justify-between")
 //create delete button
 const del = document.createElement("button")
 del.textContent = "Delete"
 li.append(del);
 del.classList.add("text-white", "bg-[#d32f2f]", "hover:bg-[#d32f2f]", "rounded-md", "p-1", "h-10", "w-35", "m-6")
 // delete task
 del.addEventListener("click", function () {
     li.remove();
 })
 //append the task value to list
 list.append(li);
 // to empty the input value after each added task
 task.value = "";
*/


