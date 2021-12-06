// console.dir(window.document);

// window.document.querySegetlector("button");


// var btn = window.document.querySelector("button");
// console.dir(btn);

// var btn = window.document.querySelector(".btn");
// console.dir(btn);

// document.querySelector("button").textContent;
// document.querySelector("#save-task");

// var buttonEl = document.querySelector("#save-task");
// console.log(buttonEl);

// buttonEl.addEventListener("click", function() {
//     alert("button clicked");
// });

// var buttonEl = document.querySelector("#save-task");  delete

var formEl = document.querySelector("#task-form"); // This will active eventListner all form not just button
var tasksToDoEl = document.querySelector("#tasks-to-do");

// buttonEl.addEventListener("click", function() {
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";
//     listItemEl.textContent = "This is a new task";
//     tasksToDoEl.appendChild(listItemEl);
// });

// code refactor : 
var createTaskHandler = function(event) {
    // console.log(event);

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    //give it a class name
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", createTaskHandler);