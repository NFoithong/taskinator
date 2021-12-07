var taskIdCounter = 0;

var formEl = document.querySelector("#task-form"); // This will active eventListner all form not just button
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    // reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    // check if task is new or one being edited by seeing if it has a data-task-id attribute
    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } // no data attribute, so create object as normal and pass to createTaskEl function
    else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput
        };

        createTaskEl(taskDataObj);
    }
};

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

    // create status options
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

// send it as an argument to createRaskEl

//Write the function in the main body of the JavaScript file: Where is the main body???????????
var completeEditTask = function(taskName, taskType, taskId) {
    // console.log(taskName, taskType, taskId);
    //find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task Updated!");

    formEl.removeAttribute("data-task-id");
    // document.querySelector("#save-task").textContent = "Add Task";
    formEl.querySelector("#save-task").textContent = "Add Task";

};


var taskButtonHandler = function(event) {
    // console.log(event.target);
    //get target element from event
    var targetEl = event.target;
    //edit button was clicked
    if (targetEl.matches(".edit-btn")) {
        console.log("edit", targetEl);
        var taskId = targetEl.getAttribute("data-task-id");
        editTask(taskId);
    }
    //delete button button was clicked
    else if (targetEl.matches(".delete-btn")) {
        var taskId = targetEl.getAttribute("data-task-id");
        deleteTask(taskId);
    }

};


var taskStatusChangeHandler = function(event) {
    console.log(event.target.value);

    //get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    //find the parent task item elemnet based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    } else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};


var editTask = function(taskId) {
    console.log(taskId);
    // console.log("editing task #" + taskId);
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskId);


    //get task lisk item element
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    //get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;
    console.log(taskName);
    document.querySelector("input[name='task-name']").value = taskName;

    var taskType = taskSelected.querySelector("span.task-type").textContent;
    console.log(taskType);
    document.querySelector("select[name='task-type']").value = taskType;

};

var deleteTask = function(taskId) {
    console.log(taskId);
    // find task list element with taskId value and remove it
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
}

// Create a new task
formEl.addEventListener("submit", taskFormHandler);

// for edit and delete buttons
pageContentEl.addEventListener("click", taskButtonHandler);

pageContentEl.addEventListener("change", taskStatusChangeHandler);