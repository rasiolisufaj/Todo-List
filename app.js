// Adding todos
const addForm = document.querySelector(".add");
const todosElement = document.querySelector(".todos");

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
  const todo = addForm.add.value.trim();
  console.log(todo);
  todosElement.append(generateTemplate(todo));
});

// Delete todos
todosElement.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});
