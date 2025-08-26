// Projeto To-Do List criado por Luis Eduardo - 2025

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const filterTasks = document.getElementById("filterTasks");
const toggleTheme = document.getElementById("toggleTheme");

document.addEventListener("DOMContentLoaded", loadTasks);

addTaskBtn.addEventListener("click", () => {
  if (taskInput.value.trim() === "") {
    alert("Digite uma tarefa antes de adicionar!");
    return;
  }
  addTask(taskInput.value);
  taskInput.value = "";
  saveTasks();
});

function addTask(taskText, isDone = false) {
  const li = document.createElement("li");
  li.textContent = taskText;

  if (isDone) li.classList.add("done");

  li.addEventListener("click", () => {
    li.classList.toggle("done");
    saveTasks();
  });

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "❌";
  deleteBtn.classList.add("deleteBtn");
  deleteBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(deleteBtn);
  taskList.appendChild(li);
}

filterTasks.addEventListener("change", () => {
  const tasks = taskList.childNodes;
  tasks.forEach(task => {
    if (task.nodeType === 1) {
      switch (filterTasks.value) {
        case "all":
          task.style.display = "flex";
          break;
        case "done":
          task.style.display = task.classList.contains("done") ? "flex" : "none";
          break;
        case "pending":
          task.style.display = task.classList.contains("done") ? "none" : "flex";
          break;
      }
    }
  });
});

toggleTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  toggleTheme.textContent = document.body.classList.contains("dark")
    ? "☀️"
    : "🌙";
});

function saveTasks() {
  const tasks = [];
  document.querySelectorAll("li").forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      done: li.classList.contains("done")
    });
  });
  localStorage.setItem("tasksLuisEduardo", JSON.stringify(tasks));
}

function loadTasks() {
  const savedTasks = JSON.parse(localStorage.getItem("tasksLuisEduardo")) || [];
  savedTasks.forEach(task => addTask(task.text, task.done));
}
