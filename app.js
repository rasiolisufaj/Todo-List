// Adding todos
const addForm = document.querySelector(".add");
const todosElement = document.querySelector(".todos");
const searchFieldElement = document.querySelector("#searchField");
const todosChildren = todosElement.children;

// Function to generate li template
const generateTemplate = (todo) => {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const i = document.createElement("i");
  li.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  span.innerText = todo;
  i.classList.add("far", "fa-trash-alt", "delete");
  li.append(span, i);
  return li;
};

addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const todo = addForm.add.value.trim().toLowerCase();
  todosElement.append(generateTemplate(todo));
  e.target.reset();
});

// Delete todos
todosElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
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
