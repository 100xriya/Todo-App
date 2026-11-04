# Todo App

A simple and responsive Todo App built with HTML, Tailwind CSS, and vanilla JavaScript.

## Features

* ✅ Add new tasks
* ✅ Delete tasks
* ✅ Mark tasks as completed
* ✅ Input validation
* ✅ Tasks persist using `localStorage`
* ✅ Tasks are restored after refreshing the page
* ✅ Dynamic DOM manipulation
* ✅ Responsive UI

## Technologies Used

* HTML5
* Tailwind CSS
* JavaScript
* Browser `localStorage`


### Core JavaScript concepts

1. DOM selection and manipulation
2. Arrays and objects
3. Array methods (`forEach`, `push`, `filter`)
4. Event listeners
5. Event bubbling and propagation
6. Conditional statements
7. JSON (`parse` and `stringify`)
8. localStorage
9. Functions and scope
10. Template literals

---

# 2. Understanding the Application Architecture

Before understanding individual lines, understand how the application is structured.

Your application has three important parts:

### A. Data layer

The `tasks` array stores all the tasks.

Each task is represented as an object:

```js
{
    id: 1730000000000,
    text: "Learn JavaScript",
    completed: false
}
```

Every task has three properties:

| Property | Purpose |
|---|---|
| id | Uniquely identifies a task |
| text | Stores the task description |
| completed | Tracks completion status |

The array is your application's main source of task data.

### B. UI layer (DOM)

The DOM represents what the user sees in the browser.

For example:

```html
<ul id="list">
    <li>
        <span>Learn JavaScript</span>
        <button>Delete</button>
    </li>
</ul>
```

JavaScript dynamically creates and modifies these elements.

### C. Persistence layer

`localStorage` saves the tasks in the browser.

Without it, refreshing the page would normally cause your JavaScript array to start empty.

Your application connects these three parts:

**JavaScript data → DOM → localStorage**

---

# 3. DOM Selection

```js
const list = document.querySelector("#list");
const add = document.querySelector("#addbtn");
const task = document.querySelector("#task");
```

### What is happening?

`document.querySelector()` searches the HTML document and returns the first element matching the supplied CSS selector.

For example:

```js
document.querySelector("#list");
```

Finds:

```html
<ul id="list"></ul>
```

The returned DOM elements are stored in variables.

| Variable | Stores |
|---|---|
| list | The task list element |
| add | The Add button |
| task | The input element |

**Important distinction:**

`task` is not the task object in your array. It is the HTML input element.

To access what the user typed, you use:

```js
task.value
```

To access the task's text in your data object, you use:

```js
taskObject.text
```

These are two completely different things.

---

# 4. Understanding localStorage and JSON

```js
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
```

This is one of the most important lines in your application.

Let's break it down.

### Step 1: localStorage.getItem()

```js
localStorage.getItem("tasks");
```

Retrieves the value stored under the key `"tasks"`.

For example, localStorage might contain:

```json
[
    {
        "id": 1,
        "text": "Learn JavaScript",
        "completed": false
    }
]
```

However, localStorage stores values as strings, not JavaScript arrays or objects.

### Step 2: JSON.parse()

```js
JSON.parse(localStorage.getItem("tasks"));
```

Converts the JSON string into a JavaScript value.

Think of it as:

**JSON string → JavaScript array/object**

Example:

```js
const storedData = '[{"id":1,"text":"Learn JS","completed":false}]';

const result = JSON.parse(storedData);
```

Now `result` is a JavaScript array containing an object.

You can access:

```js
result[0].text; // "Learn JS"
```

### Step 3: The OR operator (||)

```js
JSON.parse(localStorage.getItem("tasks")) || [];
```

What happens if there is nothing stored?

`localStorage.getItem("tasks")` returns `null`.

`JSON.parse(null)` returns `null`.

Since `null` is falsy, the OR operator evaluates the second expression:

```js
[]
```

Therefore:

- Existing data → Load the saved tasks.
- No existing data → Start with an empty array.

### Important mental model

```js
let tasks = savedTasks || [];
```

Means:

"Use the saved tasks if they exist; otherwise, create an empty array."

---

# 5. Rendering Previously Saved Tasks

```js
tasks.forEach((task) => renderTask(task));
```

When the application loads, you want previously saved tasks to appear on the screen.

But remember:

**Having data in an array does not automatically create HTML elements.**

You must manually render those elements.

### Understanding forEach()

`forEach()` executes a callback function once for every element in an array.

Example:

```js
const numbers = [10, 20, 30];

numbers.forEach((number) => {
    console.log(number);
});
```

Output:

```text
10
20
30
```

In your application:

```js
tasks.forEach((task) => renderTask(task));
```

Suppose your array contains three tasks.

The callback executes three times:

```js
renderTask(tasks[0]);
renderTask(tasks[1]);
renderTask(tasks[2]);
```

Each task is passed to `renderTask()`, which creates its corresponding HTML element.

### Why is this necessary?

Imagine you refresh the page.

The HTML elements created during the previous session no longer exist in the current DOM.

However, the data still exists in localStorage.

Therefore, you:

1. Retrieve the saved array.
2. Loop through the array.
3. Recreate the HTML elements.

This is called rendering the UI from your data.

---

# 6. Adding a New Task

Your implementation:

```js
add.addEventListener("click", function () {
    const taskText = task.value.trim();

    if (taskText === "") return;

    const newTask = {
        id: Date.now(),
        text: taskText,
        completed: false,
    };

    tasks.push(newTask);

    saveTasks();
    renderTask(newTask);

    task.value = "";
});
```

## Feature 2 – Edit Tasks

The Edit feature allows users to modify an existing task without deleting it and creating a new one.

### How it works

1. **Clicking the Edit button**
   - An event listener is attached to the Edit button inside each task's `<li>`.
   - The existing task object is located in the `tasks` array using `find()` and its unique `id`.

2. **Switching to edit mode**
   - A new `<input>` element is created using `document.createElement("input")`.
   - Its initial value is populated using the existing task's `text` property.
   - The original `<span>` displaying the task is replaced with the input using `replaceWith()`.

3. **Updating the task**
   - A `keydown` event listener detects when the user presses Enter.
   - The edited value is retrieved using `input.value`.
   - The existing task object's `text` property is updated.
   - `saveTasks()` stores the updated task array in localStorage.

4. **Exiting edit mode**
   - A new `<span>` element is created.
   - Its `textContent` is set to the updated task text.
   - The input is replaced with the updated span using `replaceWith()`.

### Important JavaScript concepts learned

| Concept | Purpose |
|---|---|
| `find()` | Locates the existing task object using its unique ID. |
| `document.createElement()` | Creates new DOM elements dynamically. |
| `.value` | Reads and sets the value of an input element. |
| `.replaceWith()` | Replaces one DOM element with another. |
| `keydown` | Detects keyboard interactions. |
| `event.key` | Identifies which key was pressed, in this case Enter. |
| `textContent` | Updates the text displayed inside an element. |

### Important distinction: Data vs DOM

During editing, two different things are involved:

- **JavaScript object:** Holds the actual task data in the `tasks` array.
- **DOM elements:** Display the task and allow the user to interact with it.

Updating the input field alone does not update the task object. The edited value must be explicitly assigned to `selectedTask.text` before saving to localStorage.

### Edit Mode and Task Completion

The task's click listener checks the clicked element's `tagName`.

- Clicking a button should not toggle task completion.
- Clicking an input should not toggle task completion.
- Clicking the task text can toggle its completed state.

This prevents accidental strikethrough changes while interacting with the edit input.

Let's understand each step.

### Step 1: Event listener

```js
add.addEventListener("click", function () {
    // Code
});
```

`addEventListener()` registers a function that executes when a particular event occurs.

Here:

- Element: Add button
- Event: click
- Callback: Function to execute when clicked

The callback does not execute immediately. It waits for the click event.

### Step 2: Reading user input

```js
const taskText = task.value.trim();
```

`value` retrieves the current input value.

`trim()` removes whitespace from both ends of a string.

Example:

```js
"   Learn JavaScript   ".trim();

// "Learn JavaScript"
```

Why use it?

Without `trim()`, a user could enter only spaces and accidentally create an empty-looking task.

### Step 3: Validation

```js
if (taskText === "") return;
```

This checks whether the input is empty.

If it is empty, `return` immediately exits the callback function.

No task is created.

### Step 4: Creating a task object

```js
const newTask = {
    id: Date.now(),
    text: taskText,
    completed: false,
};
```

Each task is stored as an object.

**Why an object?**

Because one task has multiple related properties.

You could store only strings in an array, but then tracking completion and uniquely identifying individual tasks would become more difficult.

### Understanding Date.now()

```js
Date.now();
```

Returns the current timestamp in milliseconds since January 1, 1970 (UTC).

Example:

```js
1730000000000
```

You use it as an identifier.

This is convenient for a small application because it gives each newly created task a timestamp-based ID.

It is not a mathematically guaranteed unique ID, but collisions are unlikely for ordinary single-user interactions.

### Step 5: Adding the object to the array

```js
tasks.push(newTask);
```

`push()` adds an element to the end of an array.

Before:

```js
tasks = [
    { id: 1, text: "Learn HTML", completed: true }
];
```

After:

```js
tasks.push({
    id: 2,
    text: "Learn CSS",
    completed: false
});
```

Now the array contains both tasks.

### Step 6: Saving and rendering

```js
saveTasks();
renderTask(newTask);
```

These functions do two separate jobs:

- `saveTasks()` updates localStorage.
- `renderTask()` creates the visible HTML element.

This separation is important.

One function handles persistence, and another handles the UI.

### Step 7: Clearing the input

```js
task.value = "";
```

After successfully adding a task, the input field is cleared.

Notice that this changes the input element, not the task object.

---

# 7. Understanding renderTask()

This is the central function responsible for displaying tasks.

```js
function renderTask(task) {
    const li = document.createElement("li");

    li.setAttribute("data-id", task.id);

    if (task.completed) {
        li.classList.add("completed");
    }

    li.innerHTML = `
        <span>${task.text}</span>
        <button>delete</button>
    `;

    // Event listeners

    list.appendChild(li);
}
```

Let's break it down.

### Step 1: Creating an HTML element

```js
const li = document.createElement("li");
```

This creates a new `<li>` element in memory.

Important: It does not automatically appear on the webpage.

You have created the element, but haven't attached it to the DOM yet.

### Step 2: Setting a data attribute

```js
li.setAttribute("data-id", task.id);
```

This assigns a custom HTML data attribute.

For example:

```html
<li data-id="1730000000000">
```

Why use it?

It connects the HTML element to the task object it represents.

This becomes particularly useful when implementing editing, deleting, or other task-specific functionality.

You can retrieve it using:

```js
li.dataset.id;
```

Remember that HTML data attributes are exposed as strings.

### Step 3: Conditional styling

```js
if (task.completed) {
    li.classList.add("completed");
}
```

If the task's completed property is `true`, the completed CSS class is added.

This ensures previously completed tasks are displayed correctly after refreshing the page.

### Step 4: innerHTML and template literals

```js
li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
`;
```

`innerHTML` sets the HTML content inside an element.

Template literals use backticks and allow JavaScript expressions to be embedded using `${}`.

For example:

```js
const name = "Riya";

const message = `Hello ${name}`;
```

Result:

```text
Hello Riya
```

In your application, `${task.text}` inserts the task description into the HTML.

**Security note:** Directly inserting user input into `innerHTML` can create an XSS vulnerability if someone enters malicious HTML or JavaScript. For a safer implementation, create the span separately and assign the task text using `textContent`.

---

# 8. Understanding Event Listeners and Event Bubbling

You have two click event listeners inside `renderTask()`.

One handles completion.

The other handles deletion.

This introduces an important browser concept: event bubbling.

### First listener: Toggle completion

```js
li.addEventListener("click", (e) => {
    if (e.target.tagName === "BUTTON") return;

    task.completed = !task.completed;

    li.classList.toggle("completed");

    saveTasks();
});
```

Let's examine this.

#### What is e?

`e` represents the event object.

The browser passes it to the callback when the event occurs.

It contains information about the event.

For example:

```js
e.target
```

Identifies the actual element on which the event originated.

#### Understanding e.target.tagName

```js
if (e.target.tagName === "BUTTON") return;
```

Suppose the user clicks the Delete button.

The click event originates on the button.

Because the event bubbles from the button to its parent `<li>`, the `<li>` listener also receives the event.

This condition checks whether the original target was a button.

If it was, the callback exits without toggling completion.

#### Understanding the NOT (!) operator

```js
task.completed = !task.completed;
```

The `!` operator reverses a boolean value.

| Previous value | New value |
|---|---|
| true | false |
| false | true |

Therefore, every click toggles the task's completion state.

#### Understanding classList.toggle()

```js
li.classList.toggle("completed");
```

This toggles the CSS class.

- If the class exists, it removes it.
- If the class doesn't exist, it adds it.

Your data and visual state are updated together.

#### Saving changes

```js
saveTasks();
```

The new completion state is persisted.

Without this, refreshing the page would restore the previous state.

---

# 9. Understanding Event Bubbling and stopPropagation()

Your delete listener:

```js
li.querySelector("button").addEventListener("click", (e) => {
    e.stopPropagation();

    tasks = tasks.filter((t) => t.id !== task.id);

    li.remove();

    saveTasks();
});
```

This is particularly important because your `<li>` and its child button both have click listeners.

### What is event bubbling?

Event bubbling means an event starts at the element that was clicked and propagates upward through its parent elements.

Your structure:

```html
<ul>
    <li>
        <span>Learn JavaScript</span>
        <button>Delete</button>
    </li>
</ul>
```

When the user clicks Delete, the event travels approximately like this:

```text
BUTTON
  ↓
LI
  ↓
UL
  ↓
BODY
  ↓
HTML
  ↓
DOCUMENT
```

This is event bubbling.

### Why is it a problem here?

The button is inside the `<li>`.

Both elements have click listeners.

If the user clicks Delete, the event can trigger:

1. The button's click listener.
2. The parent `<li>` click listener.

Without prevention, the task could be deleted and its completion state could also be toggled.

### Understanding stopPropagation()

```js
e.stopPropagation();
```

This prevents the event from continuing to propagate to ancestor elements.

Therefore, the parent `<li>` click listener won't receive that click.

**Important distinction:**

- `e.target` identifies where the event originated.
- `e.currentTarget` identifies the element whose listener is currently executing.
- `stopPropagation()` prevents further propagation.

Your code uses both a target check and `stopPropagation()`.

They provide protection at different points in the event flow.

---

# 10. Understanding filter() and Deleting Tasks

```js
tasks = tasks.filter((t) => t.id !== task.id);
```

This is one of the most important array operations in your application.

### What does filter() do?

`filter()` creates a new array containing only the elements that satisfy a condition.

Example:

```js
const numbers = [1, 2, 3, 4, 5];

const result = numbers.filter((number) => number > 2);
```

Result:

```js
[3, 4, 5]
```

The original array is not modified by `filter()`.

### Applying it to your application

Suppose:

```js
tasks = [
    { id: 1, text: "Learn HTML" },
    { id: 2, text: "Learn CSS" },
    { id: 3, text: "Learn JavaScript" }
];
```

You click Delete on the task with ID 2.

Your code:

```js
tasks.filter((t) => t.id !== task.id);
```

Evaluates every object.

| Task ID | Condition `t.id !== 2` | Keep? |
|---|---|---|
| 1 | true | Yes |
| 2 | false | No |
| 3 | true | Yes |

Result:

```js
[
    { id: 1, text: "Learn HTML" },
    { id: 3, text: "Learn JavaScript" }
]
```

### Why use !== instead of ===?

You want to retain every task except the one being deleted.

Therefore, the condition must be:

```js
t.id !== task.id
```

If you used:

```js
t.id === task.id
```

you would retain only the task you intended to delete.

### Why reassign tasks?

```js
tasks = tasks.filter(...);
```

Because `filter()` returns a new array.

You need to assign that returned array back to `tasks` so the application uses the updated collection.

### Removing the HTML element

```js
li.remove();
```

This removes the clicked `<li>` from the DOM.

Notice the distinction:

- `filter()` updates your JavaScript data.
- `remove()` updates your visible HTML.

You need both.

### Saving the result

```js
saveTasks();
```

This persists the updated array.

---

# 11. Understanding saveTasks()

```js
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
```

You already know that localStorage stores strings.

But `tasks` is a JavaScript array containing objects.

Therefore, you need to convert it into JSON.

### Understanding JSON.stringify()

```js
JSON.stringify(tasks);
```

Converts a JavaScript value into a JSON string.

Example:

```js
const task = {
    id: 1,
    text: "Learn JavaScript",
    completed: false
};

JSON.stringify(task);
```

Result:

```json
{"id":1,"text":"Learn JavaScript","completed":false}
```

### Understanding setItem()

```js
localStorage.setItem("tasks", JSON.stringify(tasks));
```

Stores the string under the key `"tasks"`.

The complete data flow is:

```text
JavaScript array
       ↓
JSON.stringify()
       ↓
JSON string
       ↓
localStorage.setItem()
       ↓
Data persisted
```

When the application loads again:

```text
localStorage.getItem()
       ↓
JSON string
       ↓
JSON.parse()
       ↓
JavaScript array
       ↓
Render tasks
```

This is the complete persistence cycle.

---

# 12. Understanding the Complete Application Flow

Let's connect everything.

### When the application initially loads

1. DOM elements are selected.
2. Tasks are retrieved from localStorage.
3. JSON.parse() converts the stored string into an array.
4. If no saved data exists, an empty array is created.
5. forEach() loops through the tasks.
6. renderTask() creates an HTML element for every task.

### When the user adds a task

1. User clicks Add.
2. The input value is retrieved.
3. trim() removes surrounding whitespace.
4. Empty input is rejected.
5. A new task object is created.
6. push() adds it to the array.
7. saveTasks() updates localStorage.
8. renderTask() displays the new task.
9. The input is cleared.

### When the user completes a task

1. User clicks the `<li>`.
2. The click event triggers its listener.
3. The completed property is reversed.
4. The CSS class is toggled.
5. saveTasks() persists the updated state.

### When the user deletes a task

1. User clicks Delete.
2. The button's event listener executes.
3. stopPropagation() prevents the parent click listener from executing.
4. filter() creates a new array without the selected task.
5. li.remove() removes the corresponding DOM element.
6. saveTasks() persists the new array.

---

# 13. Important Concepts to Remember

| Concept | What it does | Used in |
|---|---|---|
| querySelector() | Selects DOM elements | Initial setup |
| addEventListener() | Registers event callbacks | Add, complete, delete |
| createElement() | Creates HTML elements | renderTask() |
| setAttribute() | Sets HTML attributes | Task ID |
| classList.add() | Adds CSS classes | Completed tasks |
| classList.toggle() | Toggles CSS classes | Completion |
| appendChild() | Adds an element to the DOM | Rendering |
| remove() | Removes a DOM element | Deletion |
| push() | Adds an array element | Adding |
| forEach() | Iterates through an array | Initial rendering |
| filter() | Creates a filtered array | Deletion |
| trim() | Removes surrounding whitespace | Input validation |
| JSON.parse() | Converts JSON to JS | Loading data |
| JSON.stringify() | Converts JS to JSON | Saving data |
| stopPropagation() | Stops event bubbling | Deletion |
| Date.now() | Returns a timestamp | Task ID |

---

# 14. Things to Improve in the Existing Implementation

Your current implementation works for the basic functionality, but there are some improvements worth knowing.

### A. Avoid using innerHTML for user-provided text

Current implementation:

```js
li.innerHTML = `
    <span>${task.text}</span>
    <button>delete</button>
`;
```

Safer alternative:

```js
const span = document.createElement("span");
span.textContent = task.text;

li.appendChild(span);
```

`textContent` treats the user's input as text instead of interpreting it as HTML.

### B. Consider separating data operations from rendering

You already have a good separation between:

- `saveTasks()`
- `renderTask()`

As the application grows, you can introduce more functions:

```js
addTask();
deleteTask();
toggleTask();
renderTask();
saveTasks();
```

Each function should have a clear responsibility.

### C. Keep the data and DOM synchronized

Whenever you change a task, think about two things:

1. Has the JavaScript data changed?
2. Has the visible UI changed?

For example, deleting a task requires updating both the array and the DOM.

This becomes especially important when you add editing functionality.

---



## What I Learned

* DOM manipulation
* Event handling
* Dynamic element creation
* `classList`
* `createElement()`
* `append()`
* `remove()`
* Managing application state
* Working with `localStorage`
* Using `JSON.stringify()` and `JSON.parse()`

## Version History

### V1

* Added basic task creation and deletion
* Implemented input validation
* Practiced DOM manipulation and dynamic element creation

### V2

* Added the ability to mark tasks as completed
* Added `localStorage` for persistent data
* Tasks are automatically restored when the page is loaded
* Improved application state management

## Future Improvements

* Edit existing tasks
* Filter tasks by status
* Add task priorities or categories
* Add due dates
* Further improve accessibility and UI

