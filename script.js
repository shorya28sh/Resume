const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("todo-list");

// Load saved todos
let todos = JSON.parse(localStorage.getItem("todos")) || [];

// Save to localStorage
function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Create a todo item node
function createTodoNode(todo, index) {
  const li = document.createElement("li");
  if (todo.completed) li.classList.add("completed");

  // Checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () => {
    todo.completed = checkbox.checked;
    li.classList.toggle("completed", todo.completed);
    saveTodos();
  });

  // Text
  const textSpan = document.createElement("span");
  textSpan.textContent = todo.text;
  textSpan.addEventListener("dblclick", () => {
    const newText = prompt("Edit todo:", todo.text);
    if (newText !== null && newText.trim() !== "") {
      todo.text = newText.trim();
      textSpan.textContent = todo.text;
      saveTodos();
    }
  });

  // Delete button
  const delBtn = document.createElement("button");
  delBtn.className = "delete-btn";
  delBtn.innerHTML = "🗑️";
  delBtn.addEventListener("click", () => {
    todos.splice(index, 1);
    render();
    saveTodos();
  });

  li.append(checkbox, textSpan, delBtn);
  return li;
}

// Render todos
function render() {
  list.innerHTML = "";
  todos.forEach((todo, index) => {
    const node = createTodoNode(todo, index);
    list.appendChild(node);
  });
}

// Add new todo
function addTodo() {
  const text = input.value.trim();
  if (!text) return;
  todos.push({ text, completed: false });
  input.value = "";
  saveTodos();
  render();
}

addBtn.addEventListener("click", addTodo);
input.addEventListener("keydown", (e) => e.key === "Enter" && addTodo());

// Initialize
render();
