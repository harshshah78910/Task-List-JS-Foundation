// DECLARING THE VARIBALE 

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load Event Listeners
loadAllEventListeners();

function loadAllEventListeners()
{
    //bring and Display Tasks from local Storage
    document.addEventListener('DOMContentLoaded', getTasksFromLocalStorage);
    //Add Task
    form.addEventListener('submit', addTask);
    // Remove Task through Event Delegation
    taskList.addEventListener('click', removeTask);
    //Clear Task List 
    clearBtn.addEventListener('click', removeTaskList);
    // filter the Task 
    filter.addEventListener('keyup',filterTask);
}


//Event Functions 

function getTasksFromLocalStorage()
{
     if(localStorage.getItem('tasks') !== null)
     {
        const tasks = JSON.parse(localStorage.getItem('tasks'));
        tasks.forEach(function(task){
            const li = document.createElement('li');
            // add Class to li 
            li.className = 'collection-item';
            //Add Text Content to Elemet
            li.appendChild(document.createTextNode(task));
            // create a link element
            const link = document.createElement('a');
            // add class to link
            link.className = 'delete-item secondary-content';
            // add icon to link 
            link.innerHTML = '<i class="fa fa-remove"> </i>';
            //append Link to li
            li.appendChild(link);
            // Append the Link to UI
            taskList.appendChild(li);
        });
       
     }
}

function addTask(e)
{
    if(taskInput.value === '')
    {
        alert('Add Task');
        return;
    }
     
    // create Element
    const li = document.createElement('li');
    // add Class to li 
    li.className = 'collection-item';
    //Add Text Content to Elemet
    li.appendChild(document.createTextNode(taskInput.value));
    // create a link element
    const link = document.createElement('a');
    // add class to link
    link.className = 'delete-item secondary-content';
    // add icon to link 
    link.innerHTML = '<i class="fa fa-remove"> </i>';
    //append Link to li
    li.appendChild(link);
    // Append the Link to UI
    taskList.appendChild(li);

    //store Task in Local Storage
    addTaskToLocalStorage(taskInput.value);

    //clear the input after adding the child
    taskInput.value='';

    e.preventDefault();
}

function addTaskToLocalStorage(task)
{
      let tasks;
      if(localStorage.getItem('tasks') === null)
      {
        tasks=[];
      }
      else{
          tasks = JSON.parse(localStorage.getItem('tasks'));
      }

      tasks.push(task);

      localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTask(e)
{
    if(e.target.parentElement.classList.contains('delete-item'))
    {
        if(confirm('Are You Sure'))
        e.target.parentElement.parentElement.remove();
        removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }

   
}


function removeTaskFromLocalStorage(taskItem)
{
    let tasks;
    if(localStorage.getItem('tasks') === null)
    {
      tasks=[];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }

    tasks.forEach(function(task,index){
         if(taskItem.textContent.trim() == task) // trim was used as additional Space was getting added while retrievinng
         { 
            tasks.splice(index,1);  // returns the Removed Elements
         }
    });


    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeTaskList()
{
    // taskList.innerHTML = ''; slower way of doing things

    while(taskList.firstChild)
    {
        taskList.removeChild(taskList.firstChild);
    }

    removeTaskListFromLocalStorage();
}


function removeTaskListFromLocalStorage() {
    localStorage.clear();
}

function filterTask(e)
{
   const text = e.target.value.toLowerCase();
   document.querySelectorAll('.collection-item').forEach(
       function(task)
       {
              const item = task.firstChild.textContent.toLowerCase();
              if(item.indexOf(text) !== -1) 
              {
                task.style.display = 'block';
              }
              else{ 
                  task.style.display = 'none';

              }

       }
   );
}