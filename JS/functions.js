{
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
            <div class="list"><li class="${task.done ? "list__done" : ""}">
            ${task.content}
            <div class="list__buttonsContainer"> <button class="js-list__doneButton list__doneButton "> ${task.done ? "✔" : ""}</button>
            <button class="js-list__deleteButton list__deleteButton"> 🗑 </button> </div>
            
            </li> </div>
            `;
      }
      document.querySelector(".js-sectionTasks").innerHTML = htmlString;

      bindEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-form__newTaskInput").value.trim();


      if (newTaskContent === "") {
         return;
      }
      addNewTask(newTaskContent);
   }

   const init = () => {
      render();

      const form = document.querySelector(".js-form");
      form.addEventListener("submit", onFormSubmit);
   };

   init();
}