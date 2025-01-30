const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("task-list");

// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("li").forEach(taskItem => {
        tasks.push({
            title: taskItem.querySelector("strong").textContent,
            desc: taskItem.querySelector("p").textContent,
            priority: taskItem.querySelector("div > strong").nextSibling.textContent.trim().slice(1, -1),
            completed: taskItem.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        const taskItem = document.createElement("li");
        if (task.completed) {
            taskItem.classList.add("completed");
        }
        taskItem.innerHTML = `
        <div>
          <strong>${task.title}</strong> (${task.priority})
          <p>${task.desc}</p>
        </div>
        <div>
          <button class="complete-btn">Complete</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
        taskList.appendChild(taskItem);

        taskItem.querySelector(".complete-btn").addEventListener("click", () => {
            taskItem.classList.toggle("completed");
            saveTasks();
        });

        taskItem.querySelector(".delete-btn").addEventListener("click", () => {
            taskItem.remove();
            saveTasks();
        });
    });
}

// Call loadTasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Get task details
    const title = document.getElementById("task-title").value;
    const desc = document.getElementById("task-desc").value;
    const priority = document.getElementById("task-priority").value;

    // Create task element
    const taskItem = document.createElement("li");
    taskItem.innerHTML = `
    <div>
      <strong>${title}</strong> (${priority})
      <p>${desc}</p>
    </div>
    <div>
      <button class="complete-btn">Complete</button>
      <button class="delete-btn">Delete</button>
    </div>
  `;

    // Add task to list
    taskList.appendChild(taskItem);
    saveTasks();

    // Add event listeners for buttons
    taskItem.querySelector(".complete-btn").addEventListener("click", () => {
        taskItem.classList.toggle("completed");
        saveTasks();
    });

    taskItem.querySelector(".delete-btn").addEventListener("click", () => {
        taskItem.remove();
        saveTasks();
    });

    // Clear form
    todoForm.reset();
});