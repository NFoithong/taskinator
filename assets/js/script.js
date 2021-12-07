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

var taskIdCounter = 0;

var formEl = document.querySelector("#task-form"); // This will active eventListner all form not just button
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");

// buttonEl.addEventListener("click", function() {
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";
//     listItemEl.textContent = "This is a new task";
//     tasksToDoEl.appendChild(listItemEl);
// });

// Write a code 
// var createTaskHandler = function(event) {
//     // console.log(event);

//     event.preventDefault();

//     var taskNameInput = document.querySelector("input[name='task-name']").value;
//     var taskTypeInput = document.querySelector("select[name='task-type']").value;

//     // Create list item
//     var listItemEl = document.createElement("li");
//     listItemEl.className = "task-item";

//     // Create div to hold task info and add to list item
//     var taskInfoEl = document.createElement("div");

//     //give it a class name
//     taskInfoEl.className = "task-info";

//     //add HTML content to div
//     taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";
//     listItemEl.appendChild(taskInfoEl);

//     // add entire list item to list
//     tasksToDoEl.appendChild(listItemEl);
// };

// formEl.addEventListener("submit", createTaskHandler);

// code refactor : 
var taskFormHandler = function(event) {
    // console.log(event);

    event.preventDefault();

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    formEl.reset();

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createRaskEl
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");

    //give it a class name
    taskInfoEl.className = "task-info";

    //add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    // why this is on here !!!!!!!!!!!!!!
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);


    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    // increase task counter for next unique id
    taskIdCounter++

};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.className = "btn edit-btn";
    editButtonEl.textContent = "Edit";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // create dropdown <select>
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(statusSelectEl);

    // While a for loop isn't required to make these <option> elements, 
    // any chance to make the code more DRY is always welcome! To facilitate 
    // this looping, create the following array after the statusSelectEl expressions:

    var statusChoices = ["To Do", "In Progress", "Completed"];

    // for loop logic:
    for (var i = 0; i < statusChoices.length; i++) {
        //create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        //append to select
        statusSelectEl.appendChild(statusOptionEl);
    }

    return actionContainerEl;

};

var taskButtonHandler = function(event) {
    // console.log(event.target);
    //get target element from event
    var targetEl = event.target;
    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }

};

var deleteTask = function(taskId) {
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

var editTask = function(taskId) {
    // console.log("editing task #" + taskId);
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);


    //get task lisk item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    // console.log(taskName);
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    // console.log(taskType);
    document.querySelector("select[name='task-type']").value = taskType;


};


// if (event.target.matches(".delete-btn")) {
//     var deleteTask = function(taskId) {
//         var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
//         taskSelected.remove();
//         // get the element's task id
//         var taskId = event.target.getAttribute("data-task-id");
//         deleteTask(taskId);
// }


// var deleteTask = function(taskId) {
//     console.log(taskId);

//     if (taskId.target.matches(".delete-btn")) {
//         // get the element's task id
//         var taskId = taskId.target.getAttribute("data-task-id");
//         deleteTask(taskId);
//     }
// };

pageContentEl.addEventListener("click", taskButtonHandler);

formEl.addEventListener("submit", taskFormHandler);