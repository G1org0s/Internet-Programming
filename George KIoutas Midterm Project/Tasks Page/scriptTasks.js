// ==========================
// GET HTML ELEMENTS
// ==========================

// Task form fields
const taskForm = document.querySelector("#taskForm");
const taskName = document.querySelector("#taskName");
const taskDescription = document.querySelector("#taskDescription");
const taskDueDate = document.querySelector("#taskDueDate");
const taskPriority = document.querySelector("#taskPriority");

// Task table and summary cards
const taskTableBody = document.querySelector("#taskTableBody");
const totalTasks = document.querySelector("#totalTasks");
const pendingTasks = document.querySelector("#pendingTasks");
const completedTasks = document.querySelector("#completedTasks");

// Filter and sorting controls


const priorityFilter = document.querySelector("#priorityFilter");
const sortTasks = document.querySelector("#sortTasks");



// LOAD PREVIOUSLY SAVED DATA
// Load tasks and counters from localStorage



let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedCount = Number(localStorage.getItem("completedCount")) || 0;
let deletedCount = Number(localStorage.getItem("deletedCount")) || 0;

// Used to keep track of the task being edited




let editIndex = null;



// ADD OR UPDATE A TASK


taskForm.addEventListener("submit", function (event) {

    // Prevent page refresh
    event.preventDefault();

    // Create a task object from form values



    let task = {
        name: taskName.value,
        description: taskDescription.value,
        dueDate: taskDueDate.value,
        priority: taskPriority.value,
        status: "Active"
    };

    // Add a new task or update an existing one



    if (editIndex === null) {
        tasks.push(task);
    } else {
        tasks[editIndex] = task;
        editIndex = null;
    }

    saveData();
    taskForm.reset();
});



// DISPLAY TASKS IN TABLE


function showTasks() {

    // Clear the table before displaying tasks



    taskTableBody.innerHTML = "";

    let shownTasks = tasks;

    // Filter tasks by priority



    if (priorityFilter.value !== "All") {
        shownTasks = tasks.filter(function (task) {
            return task.priority === priorityFilter.value;
        });
    }

    // Sort tasks alphabetically




    if (sortTasks.value === "Name") {
        shownTasks.sort(function (a, b) {
            return a.name.localeCompare(b.name);
        });
    }

    // Sort tasks by due date


    if (sortTasks.value === "Date") {
        shownTasks.sort(function (a, b) {
            return new Date(a.dueDate) - new Date(b.dueDate);
        });
    }




    // Create one table row for each task


    shownTasks.forEach(function (task) {

        let index = tasks.indexOf(task);







    
        // Set badge colour based on priority


        let color = "bg-success";

        if (task.priority === "High") {
            color = "bg-danger";
        } else if (task.priority === "Medium") {
            color = "bg-warning text-dark";
        }

        let row = document.createElement("tr");

        row.innerHTML = `
            <td>${task.name}</td>
            <td>${task.description}</td>
            <td>${task.dueDate}</td>
            <td><span class="badge ${color}">${task.priority}</span></td>
            <td>${task.status}</td>
            <td>
                <button class="btn btn-success btn-sm" onclick="completeTask(${index})">Complete</button>
                <button class="btn btn-warning btn-sm" onclick="editTask(${index})">Edit</button>
                <button class="btn btn-danger btn-sm" onclick="deleteTask(${index})">Delete</button>
            </td>
        `;

        taskTableBody.appendChild(row);
    });

    updateSummary();
}



// COMPLETE TASK
// Remove task and increase completed counter


function completeTask(index) {

    completedCount = completedCount + 1;

    tasks.splice(index, 1);

    saveData();
}


// ==========================
// EDIT TASK
// ==========================

// Load selected task into the form
function editTask(index) {

    taskName.value = tasks[index].name;
    taskDescription.value = tasks[index].description;
    taskDueDate.value = tasks[index].dueDate;
    taskPriority.value = tasks[index].priority;

    editIndex = index;
}



// DELETE TASK
// Remove task and increase deleted counter



function deleteTask(index) {

    deletedCount = deletedCount + 1;

    tasks.splice(index, 1);

    saveData();
}



// SAVE DATA
// Save tasks and counters in localStorage


function saveData() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("completedCount", completedCount);
    localStorage.setItem("deletedCount", deletedCount);

    showTasks();
}



// UPDATE SUMMARY CARDS
// Update Active, Deleted and Completed cards


function updateSummary() {

    totalTasks.textContent = tasks.length;
    pendingTasks.textContent = deletedCount;
    completedTasks.textContent = completedCount;
}



// FILTER AND SORT EVENTS
// Refresh the table whenever a filter changes



priorityFilter.addEventListener("change", showTasks);
sortTasks.addEventListener("change", showTasks);



// INITIAL PAGE LOAD


// Display saved tasks when the page opens
showTasks();