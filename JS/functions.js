{
  let tasks = [];

  let hideDoneTasks = false;

  const form = document.querySelector(".js-form");

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
      },
    ];
    render();
  };

  const removeTask = (taskIndex) => {
    tasks = [...tasks.slice(0, taskIndex), ...tasks.slice(taskIndex + 1)];
    render();
  };

  const toggleAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    render();
  };

  const bindEvents = () => {
    const removeButtons = document.querySelectorAll(".js-deleteButton");

    removeButtons.forEach((removeButton, index) => {
      removeButton.addEventListener("click", () => {
        removeTask(index);
      });
    });

    const toggleDoneButtons = document.querySelectorAll(".js-doneButton");

    toggleDoneButtons.forEach((toggleDoneButton, index) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(index);
      });
    });
  };

  const renderTasks = () => {
    let htmlString = "";

    for (const task of tasks) {
      htmlString += `
          <li class="tasks__item ${hideDoneTasks && task.done ? "tasksList__item--hidden" : ""
        } js-task">
              <button class="tasks__button  tasks__item--toggleDone js-doneButton ">
               ${task.done ? "✔" : ""}
              </button>
              <span class="tasks__content ${task.done ? "tasks__content--done" : ""
        }">${task.content}</span>
             <button class="tasks__button tasks__deleteButton js-deleteButton">
              🗑
             </button>
          </li>
       `;
    }
    document.querySelector(".js-tasks").innerHTML = htmlString;
  };

  const bindButtonsEvents = () => {
    const hideDoneButton = document.querySelector(".js-hideDoneButton");
    const markAllTasksDoneButton = document.querySelector(
      ".js-markAllTasksDoneButton"
    );

    if (hideDoneButton) {
      hideDoneButton.addEventListener("click", () => {
        hideDoneTasks = !hideDoneTasks;
        render();
      });
    }

    if (markAllTasksDoneButton) {
      markAllTasksDoneButton.addEventListener("click", () => {
        toggleAllTasksDone();
      });
    }
  };

  const renderButtons = () => {
    const headerButtons = document.querySelector(".js-main__headlineButtons");

    if (tasks.length === 0) {
      headerButtons.innerHTML = "";
    } else {
      headerButtons.innerHTML = `
        <button class="main__button js-hideDoneButton"> 
         ${hideDoneTasks ? "Pokaż" : "Ukryj"} ukończone
        </button> 
        <button class="main__button js-markAllTasksDoneButton" ${tasks.every(({ done }) => done) ? "disabled" : ""
        }>
        Ukończ wszystkie
        </button>
        `;
    }
    bindButtonsEvents();
  };

  const render = () => {
    renderTasks();
    renderButtons();
    bindEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTaskInput");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent === "") {
      newTaskElement.focus();
      return;
    } else {
      addNewTask(newTaskContent);
      form.reset();
      newTaskElement.focus();
    }
  };

  const init = () => {
    render();

    form.addEventListener("submit", onFormSubmit);
  };

  init();
}