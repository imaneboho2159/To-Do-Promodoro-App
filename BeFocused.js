
const todoForm = document.getElementById("todo-form");
const taskList = document.getElementById("task-list");

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

    // Add event listeners for buttons
    taskItem.querySelector(".complete-btn").addEventListener("click", () => {
        taskItem.classList.toggle("completed");
    });

    taskItem.querySelector(".delete-btn").addEventListener("click", () => {
        taskItem.remove();
    });

    // Clear form
    todoForm.reset();
});