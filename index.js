document.addEventListener("DOMContentLoaded", () => {
    const todoip = document.getElementById("to-do-input");
    const addtbtn = document.getElementById("add-btn");
    const todoli = document.getElementById("todoli");
  
    // Load tasks from localStorage or start with an empty array
    let tasks = JSON.parse(localStorage.getItem("task")) || [];
  
    // Render existing tasks
    tasks.forEach((task) => renderTask(task));
  
    // Add new task when the button is clicked
    addtbtn.addEventListener("click", function () {
      const tasktext = todoip.value.trim();
      if (tasktext === "") return; // Skip empty input
  
      // Create new task object
      const newtask = {
        id: Date.now(),
        text: tasktext,
        completed: false,
      };
  
      // Push new task to the array and save
      tasks.push(newtask);
      savedTask(); // Save to localStorage
      renderTask(newtask); // Render the new task in the UI
      todoip.value = ""; // Clear input
    });
  
    // Function to render a task
    function renderTask(task) {
      const li = document.createElement("li");
      li.setAttribute("data-id", task.id);
      li.innerHTML = `<span>${task.text}</span><button id="delete-btn">delete</button>`;
      todoli.appendChild(li);
  
      // Toggle completed state
      li.addEventListener("click", (e) => {
        if (e.target.tagName === "BUTTON") return; // Skip if delete button is clicked
        task.completed = !task.completed;
        li.classList.toggle("completed"); // Toggle completed class
        savedTask(); // Save updated tasks to localStorage
      });
  
      // Delete task on button click
      li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent toggle when deleting
  
        const taskId = li.getAttribute("data-id"); // Get task ID from li's data-id
        tasks = tasks.filter(t => t.id != taskId); // Filter out the task by ID
        li.remove(); // Remove task from the DOM
        savedTask(); // Save updated tasks to localStorage
      });
    }
  
    // Function to save tasks to localStorage
    function savedTask() {
      localStorage.setItem("task", JSON.stringify(tasks));
    }
  });
  