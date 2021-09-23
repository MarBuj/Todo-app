const inputBox = document.querySelector('input');
const addBtn = document.querySelector('.addBtn');
const todoList = document.querySelector('.todoList');
const doneList = document.querySelector('.doneList');
const deleteListBtn = document.querySelector('.deleteListBtn');

let todoArray;
let doneArray;

showTasks();

inputBox.onkeyup = () => {
    let inputData = inputBox.value;
    if (inputData.trim() != 0) {
        addBtn.classList.remove('disable');
    } else {
        addBtn.classList.add('disable');
    }
};

// Task add to "In progress" list;
addBtn.onclick = () => {
    let inputData = inputBox.value;
    let getTodoLocalStorage = localStorage.getItem("todoTasks"); 
    if (getTodoLocalStorage == null) { 
        todoArray = []; 
    } else { 
        todoArray = JSON.parse(getTodoLocalStorage); 
    }
    todoArray.push(inputData); 
    localStorage.setItem("todoTasks", JSON.stringify(todoArray)); 
    showTasks();
    addBtn.classList.add('disable');
};

// Content show function;
function showTasks() {
    // Local storage of "In progress" list tasks;
    let getTodoLocalStorage = localStorage.getItem("todoTasks"); 
    if (getTodoLocalStorage == null) { 
        todoArray = []; 
    } else { 
        todoArray = JSON.parse(getTodoLocalStorage); 
    }
    let todoItem = '';
    for (let i = 0; i < todoArray.length; i++) {
        todoItem += '<li class="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between align-content-center overflow-hidden">'+ todoArray[i] +'<div class="action-icons d-flex align-items-center"><i class="todoCompleteBtn fas fa-check-square align-self-center me-1"></i><i class="todoDeleteBtn fas fa-trash-alt align-self-center"></i></div></li>';
    }
    todoList.innerHTML = todoItem;
    inputBox.value = '';

    // Number of active "In progress" tasks;
    const pendingNumber = document.querySelector('.pendingNumber');
    pendingNumber.innerHTML = todoArray.length;

    // Local storage of "Completed" list tasks;
    let getDoneLocalStorage = localStorage.getItem("doneTasks"); 
    if (getDoneLocalStorage == null) { 
        doneArray = []; 
    } else { 
        doneArray = JSON.parse(getDoneLocalStorage);
    }
    let doneItem = '';
    for (let i = 0; i < doneArray.length; i++) {
        doneItem += '<li class="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between align-content-center overflow-hidden"><span class="text-decoration-line-through">'+ doneArray[i] +'</span><div class="action-icons d-flex align-items-center"><i class="undoCompletedBtn fas fa-trash-restore align-self-center me-1"></i><i class="doneDeleteBtn fas fa-trash-alt align-self-center"></i></div></li>';
    }
    doneList.innerHTML = doneItem;

    // Arguments for "Clear the list" button accessibility;
    if (todoArray.length != 0 || doneArray.length != 0) {
        deleteListBtn.classList.remove('disable');
    } else {
        deleteListBtn.classList.add('disable');
    }

    // "In progress" task delete;
    let todoDeleteBtns = document.querySelectorAll('.todoDeleteBtn');
    for (let i = 0; i < todoDeleteBtns.length; i++) {
        todoDeleteBtns[i].onclick = () => {
            let getTodoLocalStorage = localStorage.getItem("todoTasks"); 
            todoArray = JSON.parse(getTodoLocalStorage); 
            todoArray.splice(i, 1);
            localStorage.setItem("todoTasks", JSON.stringify(todoArray)); 
            showTasks();
        }
    }

    // "In progress" task add to "Completed" list;
    let todoCompleteBtns = document.querySelectorAll('.todoCompleteBtn');
    for (let i = 0; i < todoCompleteBtns.length; i++) {
        todoCompleteBtns[i].onclick = () => {
            let getTodoLocalStorage = localStorage.getItem("todoTasks"); 
            todoArray = JSON.parse(getTodoLocalStorage); 
            
            let getDoneLocalStorage = localStorage.getItem("doneTasks"); 
            if (getDoneLocalStorage == null) { 
                doneArray = []; 
            } else { 
                doneArray = JSON.parse(getDoneLocalStorage); 
            }
 
            doneArray.push(todoArray[i]);
            todoArray.splice(i, 1);

            localStorage.setItem("todoTasks", JSON.stringify(todoArray)); 
            localStorage.setItem("doneTasks", JSON.stringify(doneArray)); 
            
            showTasks();
        }
    }

    // "Completed" task return to "In progress" list;
    let undoCompletedBtns = document.querySelectorAll('.undoCompletedBtn');
    for (let i = 0; i < undoCompletedBtns.length; i++) {
        undoCompletedBtns[i].onclick = () => {
            let getTodoLocalStorage = localStorage.getItem("todoTasks"); 
            if (getTodoLocalStorage == null) { 
                todoArray = []; 
            } else { 
                todoArray = JSON.parse(getTodoLocalStorage); 
            }

            let getDoneLocalStorage = localStorage.getItem("doneTasks"); 
            doneArray = JSON.parse(getDoneLocalStorage); 

            todoArray.push(doneArray[i]);
            doneArray.splice(i, 1);

            localStorage.setItem("todoTasks", JSON.stringify(todoArray)); 
            localStorage.setItem("doneTasks", JSON.stringify(doneArray)); 
                
            showTasks();
        }
    }

    // "Completed" task delete;
    let doneDeleteBtns = document.querySelectorAll('.doneDeleteBtn');
    for (let i = 0; i < doneDeleteBtns.length; i++) {
        doneDeleteBtns[i].onclick = () => {
            let getDoneLocalStorage = localStorage.getItem("doneTasks"); 
            doneArray = JSON.parse(getDoneLocalStorage); 
            doneArray.splice(i, 1);
            localStorage.setItem("doneTasks", JSON.stringify(doneArray)); 
            showTasks();
        }
    }
}

// "In progress" & "Completed" tasks delete (local storage clearing);
deleteListBtn.onclick = () => {
    todoArray = [];
    doneArray = [];

    localStorage.setItem("todoTasks", JSON.stringify(todoArray)); 
    localStorage.setItem("doneTasks", JSON.stringify(doneArray)); 

    showTasks();
}
