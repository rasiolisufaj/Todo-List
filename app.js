// Adding todos
const addForm = document.querySelector(".add");
const todosElement = document.querySelector(".todos");
const searchFieldElement = document.querySelector("#searchField");
const todosChildren = todosElement.children;

const URL_API = "https://crudcrud.com/api/cad7fae2d1074479942d8a45ffc9fe6b";

let todos = [];

// Get All Todos
async function getAllTodos() {
  const response = await fetch(URL_API + "/todos");
  const data = await response.json();
  return data;
}

getAllTodos().then((data) => {
  todos = data;
  displayAllTodos();
});

// Display all todos
function displayAllTodos() {
  todosElement.innerHTML = "";

  todos.forEach((todo) => {
    const todoTemplate = generateTodoTemplate(todo);
    console.log(todoTemplate);
    todosElement.append(todoTemplate);
  });
}

// Function to generate li template
const generateTodoTemplate = (todo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const i = document.createElement("i");
  const input = document.createElement("input");
  input.type = "hidden";
  input.value = todo._id;
  let isDone = todo.isDone ? "isDone" : "notDone";
  console.log(isDone);
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    isDone
  );
  span.innerText = todo.title;
  i.classList.add("far", "fa-trash-alt", "delete");
  li.append(span, i, input);
  return li;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim().toLowerCase();
  todosElement.append(generateTodoTemplate(todo));
  e.target.reset();
});

// Delete todos
todosElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    const id = e.target.parentElement.children[2].value;
    fetch(URL_API + "/todos/" + id, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.status === 200) {
          e.target.parentElement.remove();
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
