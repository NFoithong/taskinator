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

var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// buttonEl.addEventListener("click", function() {
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";
//     listItemEl.textContent = "This is a new task.";
//     tasksToDoEl.appendChild(listItemEl);
// });

// code refactor : 
var createTaskHandler = function() {
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task."
    tasksToDoEl.appendChild(listItemEl);
};

buttonEl.addEventListener("click", createTaskHandler);