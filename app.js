// Adding todos
const addForm = document.querySelector(".add");
const editForm = document.querySelector(".edit");
const todosElement = document.querySelector(".todos");
const searchFieldElement = document.querySelector("#searchField");
const todosChildren = todosElement.children;

const URL_API = "https://crudcrud.com/api/61e2743cfefe49c38a25b80743c25b3e";

let todos = [];

// Get All Todos
async function getAllTodos() {
  const response = await fetch(URL_API + "/todos");
  const data = await response.json();
  return data;
}

getAllTodos().then((data) => {
  todos = data;
  console.log(todos);
  displayAllTodos();
});

// Display all todos
function displayAllTodos() {
  todosElement.innerHTML = "";

  todos.forEach((todo) => {
    const todoTemplate = generateTodoTemplate(todo);
    todosElement.append(todoTemplate);
  });
}

// Function to generate li template
const generateTodoTemplate = (todo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const deleteIcon = document.createElement("i");
  const editIcon = document.createElement("i");
  const input = document.createElement("input");
  const iconsDiv = document.createElement("div");
  input.type = "hidden";
  input.value = todo._id;
  let isDone;
  if (todo.isDone === false) {
    isDone = "notDone";
  } else {
    isDone = "isDone";
  }
  console.log(isDone);
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    isDone
  );
  span.innerText = todo.title;
  editIcon.classList.add("fa-solid", "fa-pen-to-square", "edit");
  deleteIcon.classList.add("far", "fa-trash-alt", "delete");
  iconsDiv.append(editIcon, deleteIcon);
  li.append(span, iconsDiv, input);
  return li;
};

// Function edit todo
function editTodo() {}

// Add todo
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todoTitle = addForm.add.value.trim().toLowerCase();
  if (todoTitle.length == 0 && todoTitle.length > 40) {
    alert("Todo must be filled out");
    return false;
  }
  const todo = { title: todoTitle, isDone: false };
  fetch(URL_API + "/todos/", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(todo),
  })
    .then((res) => res.json())
    .then((data) => {
      todos.push(data),
        todosElement.append(generateTodoTemplate(data)),
        console.log(todos);
    });
  e.target.reset();
});

// Edit Todo Form
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const editTitle = editForm.edit.value.trim().toLowerCase();
  console.log(editTitle);
});

// Edit Icon Click
todosElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("edit")) {
    addForm.classList.add("d-none");
    editForm.classList.remove("d-none");
    const id = e.target.parentElement.parentElement.children[2].value;
    console.log(id);
    fetch(URL_API + "/todos/" + id)
      .then((res) => res.json())
      .then((data) => {
        (data.title = "travel to madrid"), console.log(data);
      });
  }
});

// Delete todo
todosElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    addForm.classList.remove("d-none");
    editForm.classList.add("d-none");
    const id = e.target.parentElement.parentElement.children[2].value;
    console.log(id);
    fetch(URL_API + "/todos/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          e.target.parentElement.parentElement.remove();
        } else {
          throw new Error("Can not delete");
        }
      })
      .catch((error) => {
        alert(error.message);
      });
  }
});

// Searching & Filtering Todos
searchFieldElement.addEventListener("keyup", (e) => {
  const keyword = searchFieldElement.value.toLowerCase();
  console.log(todosChildren.length);
  for (let index = 0; index < todosChildren.length; index++) {
    const liElement = todosChildren.item(index);
    if (!liElement.children[0].innerText.includes(keyword)) {
      liElement.classList.add("d-none");
    } else {
      liElement.classList.remove("d-none");
    }
  }
});
