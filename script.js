// Sélectionner les éléments du DOM
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Charger les tâches sauvegardées depuis localStorage au démarrage
document.addEventListener("DOMContentLoaded", loadTasksFromLocalStorage);

// Ajouter une nouvelle tâche quand on clique sur le bouton
addTaskBtn.addEventListener("click", addTask);

// Fonction pour ajouter une nouvelle tâche
function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === "") {
    alert("Veuillez ajouter une tâche valide.");
    return;
  }

  // Créer un nouvel élément de liste
  const li = document.createElement("li");
  li.textContent = taskText;

  // Bouton de suppression
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Supprimer";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", removeTask);
  li.appendChild(deleteBtn);

  // Marquer la tâche comme complétée
  li.addEventListener("click", toggleComplete);

  // Ajouter l'élément à la liste
  taskList.appendChild(li);

  // Sauvegarder dans localStorage
  saveTaskToLocalStorage(taskText);

  // Réinitialiser le champ de saisie
  taskInput.value = "";
}

// Supprimer une tâche
function removeTask(e) {
  const taskItem = e.target.parentElement;
  const taskText = taskItem.textContent.replace("Supprimer", "").trim();

  // Supprimer du DOM
  taskItem.remove();

  // Supprimer du localStorage
  removeTaskFromLocalStorage(taskText);
}

// Marquer une tâche comme terminée/incomplète
function toggleComplete(e) {
  e.target.classList.toggle("completed");
}

// Sauvegarder la tâche dans localStorage
function saveTaskToLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Charger les tâches depuis localStorage
function loadTasksFromLocalStorage() {
  let tasks = getTasksFromLocalStorage();
  tasks.forEach(function(task) {
    // Créer l'élément de liste
    const li = document.createElement("li");
    li.textContent = task;

    // Bouton de suppression
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", removeTask);
    li.appendChild(deleteBtn);

    // Marquer comme complétée
    li.addEventListener("click", toggleComplete);

    // Ajouter l'élément à la liste
    taskList.appendChild(li);
  });
}

// Obtenir les tâches depuis localStorage
function getTasksFromLocalStorage() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  return tasks;
}

// Supprimer la tâche du localStorage
function removeTaskFromLocalStorage(task) {
  let tasks = getTasksFromLocalStorage();
  tasks = tasks.filter(function(t) {
    return t !== task;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
