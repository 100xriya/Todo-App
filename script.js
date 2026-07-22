// Feature 1- adding the task to the list 

const list = document.querySelector("#list");
const add = document.querySelector("#addbtn");
const task = document.querySelector("#task");
// Removing task from the list 
// const remove = document.querySelector("#removebtn");
add.addEventListener("click", function () {
    if (task.value.trim() !== "") {
        // create task
        const li = document.createElement("li")
        li.textContent = task.value;
        li.classList.add("flex", "justify-between", "list-disc")
        //create delete button
        const del = document.createElement("button")
        del.textContent = "Delete"
        li.append(del);
        del.classList.add("text-slate-800", "bg-slate-100", "border-slate-500", "border-4", "rounded-md", "px-1", "py-1", "h-10", "w-35", "m-6")
        // delete task
        del.addEventListener("click", function () {
            li.remove();
        })
        //append the task value to list
        list.append(li);
        // to empty the input value after each added task
        task.value = "";

    }

})
