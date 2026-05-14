const inputEl = document.querySelector("#taskInput");
const button = document.querySelector("#btn");
const list = document.querySelector("#taskList");
const progressBar = document.querySelector("#progressBar");
const progressText = document.querySelector("#progressText");


button.addEventListener("click", addTask);

inputEl.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

function addTask(taskData = null) {
 const text = taskData ? taskData.text : inputEl.value.trim();
  if (text === "") return;
  const li = document.createElement("li");

  if(taskData && taskData.completed){
     li.classList.add("Complete-Btn");
  }

  const span = document.createElement("span");
  span.classList.add("task-text");
  span.textContent = text;
  li.appendChild(span);
  list.appendChild(li);

  inputEl.value = "";

  //Delete button
  let deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.classList.add("deleteBtn");
  li.appendChild(deleteBtn);

  deleteBtn.onclick = function () {
    li.remove();

    updateProgress();
    saveTask();
  }

  //Edit button
  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.classList.add("editBtn");
  li.appendChild(editBtn);

  editBtn.onclick = function () {
    let newTask = prompt("Edit Task");
    if (newTask !== null && newTask !== "") {
      li.firstChild.textContent = newTask;
      saveTask();
    }
  }

  //Complete button

  let CompleteBtn = document.createElement("button");
  CompleteBtn.innerText = "Done"
  CompleteBtn.classList.add("CompleteBtn");
  li.appendChild(CompleteBtn);

  CompleteBtn.onclick = function () {
    li.classList.toggle("Complete-Btn");

    updateProgress();
    saveTask();
  }
    saveTask();

  updateProgress();

}

function updateProgress() {

  const allTasks = document.querySelectorAll("#taskList li");
  const completedTasks = document.querySelectorAll("#taskList li.Complete-Btn");
  const totalTasks = allTasks.length;
  const completedCount = completedTasks.length;

  let percent = 0;

  if (totalTasks > 0) {

    percent = (completedCount / totalTasks) * 100;

  }

  progressBar.style.width = percent + "%";

  progressText.innerText = Math.round(percent) + "% Completed";

}

function saveTask() {
  let tasks = [];
  document.querySelectorAll("#taskList li").forEach((li) => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains("Complete-Btn")
    })
  })
  localStorage.setItem("tasks", JSON.stringify(tasks));
  console.log(tasks);
}

function loadTask() {

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) return;

  tasks.forEach((task) => {

    addTask(task);

  });

}
window.onload = loadTask;