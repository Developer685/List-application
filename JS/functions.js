{
   const form = document.querySelector(".js-form");

   const tasks = [

   ];

   const addNewTask = (newTaskContent) => {

      tasks.push({
         content: newTaskContent,
      });

      render();
   };

   const removeTask = (taskIndex) => {
      tasks.splice(taskIndex, 1);
      render();
   };
   const toggleTaskDone = (taskIndex) => {
      tasks[taskIndex].done = !tasks[taskIndex].done;
      render();
   };

   const bindEvents = () => {
      const removeButtons = document.querySelectorAll(".js-list__deleteButton");

      removeButtons.forEach((removeButtons, taskIndex) => {
         removeButtons.addEventListener("click", () => {
            removeTask(taskIndex);
         });
      });

      const toggleDoneButtons = document.querySelectorAll(".js-list__doneButton");

      toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
         toggleDoneButton.addEventListener("click", () => {
            toggleTaskDone(taskIndex);
         });
      });
   }


   const render = () => {
      let htmlString = "";
      //✅
      for (const task of tasks) {
         htmlString += `
            <li class=list>
            <button class="js-list__doneButton list__doneButton "> ${task.done ? "✔" : ""}</button> 
            <span class="${task.done ? "list__done" : ""}">${task.content}</span> 
            <button class="js-list__deleteButton list__deleteButton"> 🗑 </button> 
            </list>
            `;
      }
      document.querySelector(".js-sectionTasks").innerHTML = htmlString;

      bindEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-form__newTaskInput");
      const newTaskElement = newTaskContent.value.trim();

      if (newTaskElement === "") {
         newTaskContent.focus();
         return;
      }
      else {
         addNewTask(newTaskElement);
         form.reset();
         newTaskContent.focus();
      }
   }

   const init = () => {
      render();

      form.addEventListener("submit", onFormSubmit);
   };

   init();
}