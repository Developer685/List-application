{
   const tasks = [
      {
         content: "Zrobić zupę",
         done: false,
      },
      {
         content: "Obejrzeć lekcję",
         done: true,
      },
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
      const removeButtons = document.querySelectorAll(".js-remove");

      removeButtons.forEach((removeButtons, taskIndex) => {
         removeButtons.addEventListener("click", () => {
            removeTask(taskIndex);
         });
      });

      const toggleDoneButtons = document.querySelectorAll(".js-done");

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
            <div class="list"> <div><li class="${task.done ? "list__done" : "🟩"}">
            ${task.content}</div>
            <div class="buttonsContainer"> <button class="js-done doneButton ${task.done ? "js-done doneButtonChecked" : "🟩"}"> 🟩 </button>
            <button class="js-remove deleteButton"> Usuń </button> </div>
            
            </li> </div>
            `;
      }
      document.querySelector(".js-tasks").innerHTML = htmlString;

      bindEvents();
   };

   const onFormSubmit = (event) => {
      event.preventDefault();

      const newTaskContent = document.querySelector(".js-newTask").value.trim();


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
