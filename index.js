function createTask(title, date, priority) {
    return {
      title,
      date,
      priority,
    };
  }

// Save in localstorage
const saveLocal = () => {
  if (tasks.length > 0) {
    localStorage.setItem('myTasks', JSON.stringify(tasks));
  }
};

// Get from localstorage
window.onload = function () {
  const storedTasks = JSON.parse(localStorage.getItem('myTasks'));
  if (storedTasks) {
    tasks = storedTasks.map((task) => JSONToTask(task));
  } else {
    tasks = [];
  }
 
};

function JSONToTask(taskJson) {
  return createTask(taskJson.title, taskJson.date, taskJson.priority);
}

  let tasks = [];
  
  const taskTitle = document.querySelector('#task-title');
  const taskDate = document.querySelector('#task-date');
  const taskPriority = document.querySelector('#task-priority');
  const taskForm = document.querySelector('#task-form');
  const taskList = document.querySelector('#task-list');


  const currentDate = new Date(); // Create a new Date object with the current date and time
  const year = currentDate.getFullYear(); // Get the current year (e.g. 2021)
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Get the current month (0-11), add 1 to get the actual month number (e.g. 05 for May)
  const day = String(currentDate.getDate()).padStart(2, '0'); // Get the current day of the month (1-31) and pad it with a leading zero if necessary (e.g. 22)
  const formattedDate = `${year}-${month}-${day}`; // Format the date as a string in the desired format (e.g. "2021-10-15")
  
  
  


    const addTaskButton = document.querySelector('button[type="submit"]');

    
    addTaskButton.addEventListener('click', (e) => {
      e.preventDefault(); 
  
      const newTask = createTask(taskTitle.value, taskDate.value, taskPriority.value);
    
      tasks.unshift(newTask);
      const taskElement = document.createElement('div');
      taskElement.setAttribute("class", "task-element");
      taskElement.innerHTML = `
      <input type="checkbox" class="task-checkbox">
      <span class="task-content">${newTask.title}  </span>
      <span class="task-content">Priority: ${newTask.priority} </span>
      <span class="task-content"> Date: ${newTask.date} </span>
      <button><img class="delete-button" src="./images/trash.png" alt="delete-icon"></button>
    `;
      taskList.insertBefore(taskElement, taskList.firstChild);
      taskTitle.value = '';
      taskDate.value = '';
      taskPriority.value = 'High';
      saveLocal();

    });


    



    taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-button')) {
        const taskElement = e.target.closest('.task-element');
        const index = Array.from(taskList.children).indexOf(taskElement);
        tasks.splice(index, 1);
        taskElement.classList.add('delete-effect');

        taskElement.addEventListener('transitionend', () => {
          taskList.removeChild(taskElement);
          saveLocal();

        });
      }
    });
    
  

taskList.addEventListener('click', (e) => {
  if (e.target.classList.contains('task-checkbox')) {
    const taskElements = e.target.closest('.task-element').querySelectorAll("span");
    taskElements.forEach(taskElement => {
      taskElement.classList.toggle('completed');
      saveLocal();

    });
  }
});


    
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}


const pageTitle = document.querySelector("#page-title");
const navLinks =  document.querySelectorAll(".nav-link");


navLinks.forEach(navLink =>  {
  navLink.addEventListener("click", (event) => {
    event.preventDefault();
    const clickedEl = event.target;
    const clickedElContent = clickedEl.textContent;
    pageTitle.textContent = clickedElContent;
    saveLocal();

})
})



const inboxButton = document.querySelector("#inbox");
inboxButton.addEventListener("click", showInboxTasks);

const todayButton = document.querySelector("#today");
todayButton.addEventListener("click", showTodayTasks);

const upcomingButton = document.querySelector("#upcoming");
upcomingButton.addEventListener("click", showUpcomingTasks);


function showInboxTasks(event){

  event.preventDefault();
  taskList.innerHTML = ""; 

  for (let i = 0; i < tasks.length; i++) {
    const taskElement = document.createElement('div');
      taskElement.setAttribute("class", "task-element");
      taskElement.innerHTML = `
      <input type="checkbox" class="task-checkbox">
      <span class="task-content">${tasks[i].title}  </span>
      <span class="task-content">Priority: ${tasks[i].priority} </span>
      <span class="task-content"> Date: ${tasks[i].date} </span>
      <button><img class="delete-button" src="./images/trash.png" alt="delete-icon"></button>
    `;
    taskList.insertBefore(taskElement, taskList.firstChild);
    saveLocal();

  }
    }
  
  

function showTodayTasks(event) {
  event.preventDefault();
  taskList.innerHTML = ""; 

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].date === formattedDate) {
      const taskElement = document.createElement('div');
      taskElement.setAttribute("class", "task-element");
      taskElement.innerHTML = `
      <input type="checkbox" class="task-checkbox">
      <span class="task-content">${tasks[i].title}  </span>
      <span class="task-content">Priority: ${tasks[i].priority} </span>
      <span class="task-content"> Date: ${tasks[i].date} </span>
      <button><img class="delete-button" src="./images/trash.png" alt="delete-icon"></button>
    `;
      taskList.insertBefore(taskElement, taskList.firstChild);
      saveLocal();

    }
  }
}

function showUpcomingTasks(event) {
  event.preventDefault();
  taskList.innerHTML = ""; 

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].date > formattedDate) {
      const taskElement = document.createElement('div');
      taskElement.setAttribute("class", "task-element");
      taskElement.innerHTML = `
      <input type="checkbox" class="task-checkbox">
      <span class="task-content">${tasks[i].title}  </span>
      <span class="task-content">Priority: ${tasks[i].priority} </span>
      <span class="task-content"> Date: ${tasks[i].date} </span>
      <button><img class="delete-button" src="./images/trash.png" alt="delete-icon"></button>
    `;
      taskList.insertBefore(taskElement, taskList.firstChild);
      saveLocal();

    }
  }
}

