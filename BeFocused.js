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
        <div class="btoona">
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
    <div class="btoona">
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

let timer;
let isPaused = true;
let workDuration = 25 * 60;
let shortBreak = 5 * 60;
let longBreak = 15 * 60;
let currentTime = workDuration;
let completedCycles = 0;

const timeDisplay = document.getElementById("time-display");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");
const cyclesCount = document.getElementById("cycles-count");

const updateTimerDisplay = () => {
    const minutes = Math.floor(currentTime / 60).toString().padStart(2, "0");
    const seconds = (currentTime % 60).toString().padStart(2, "0");
    timeDisplay.textContent = `${minutes}:${seconds}`;
};

startBtn.addEventListener("click", () => {
    if (isPaused) {
        isPaused = false;
        timer = setInterval(() => {
            if (currentTime > 0) {
                currentTime--;
                updateTimerDisplay();
            } else {
                clearInterval(timer);
                completedCycles++;
                cyclesCount.textContent = completedCycles;
                alert("Time's up! Take a break.");
                currentTime = workDuration;
            }
        }, 1000);
    }
});

pauseBtn.addEventListener("click", () => {
    clearInterval(timer);
    isPaused = true;
});

resetBtn.addEventListener("click", () => {
    clearInterval(timer);
    isPaused = true;
    currentTime = workDuration;
    updateTimerDisplay();
});


document.getElementById("work-duration").addEventListener("change", (e) => {
    workDuration = e.target.value * 60;
    currentTime = workDuration;
    updateTimerDisplay();
});

document.getElementById("short-break").addEventListener("change", (e) => {
    shortBreak = e.target.value * 60;
});

document.getElementById("long-break").addEventListener("change", (e) => {
    longBreak = e.target.value * 60;
});

updateTimerDisplay();