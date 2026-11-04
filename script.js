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
    <div id="listbtn">
        <button class="edit">Edit</button>
        <button class="delete">Delete</button>
    </div>
    `;
    li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return; //  if event starts with button ->return

        // toggle completed state
        if (e.target.tagName === "INPUT") {
            return;
        } else {
            task.completed = !task.completed;
            li.classList.toggle("completed");

        }

        saveTasks();
    });

    li.querySelector(".delete").addEventListener("click", (e) => {
        // EVENT BUBBLING
        e.stopPropagation(); //prevent toggle from firing
        tasks = tasks.filter((t) => t.id !== task.id); // if u use === here it will filter(remove) everything except where i clicked on
        li.remove();
        saveTasks();
    });

    list.appendChild(li);

    /*   li.querySelector(".edit").addEventListener("click", (e) => {
          const editableText = li.querySelector("span")
          const selectedText = tasks.find((t) => t.id === task.id); // find the element with same id 
          selectedText.text = document.createElement("input");
          editableText.replaceWith(selectedText);
  
      });
   */
    li.querySelector(".edit").addEventListener("click", (e) => {
        const editableText = li.querySelector("span");

        // 1. Find the task object.
        const selectedText = tasks.find((t) => t.id === task.id); // find the element with same id 

        // 2. Create an input element.
        const input = document.createElement("input");
        input.classList.add('edited');
        // 3. Give the input its initial value using the task's existing text.
        input.value = selectedText.text;
        // 4. Replace the span with the input.
        editableText.replaceWith(input);


        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                selectedText.text = input.value;
                saveTasks();
                const updatedText = document.createElement("span");
                updatedText.textContent = selectedText.text;
                input.replaceWith(updatedText)
            }
        });
    });

    // convert tasks into string using JSON.stringify 


}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}