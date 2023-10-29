// @ts-nocheck
import { Todo } from "./classes/todo.js";
const cardBody = document.querySelector(".card-body");
const todoForm = document.querySelector(".todo-form");
const todoInput = document.querySelector("#inputTodo");
const addTodoButton = document.querySelector("#addTodoButton");
const todoMessage = document.querySelector("#message");
const todoLists = document.querySelector("#lists");

//show message
const showMessage = (text, status) => {
  todoMessage.textContent = text;
  todoMessage.classList.add(`bg-${status}`);
  setTimeout(() => {
    todoMessage.textContent = "";
    todoMessage.classList.remove(`bg-${status}`);
  }, 2000);
};
// CreateTodo
const createTodo = (newTodo) => {
  const todoElement = document.createElement("li");
  todoElement.classList.add("li-style");
  todoElement.id = newTodo.todoId;

  todoElement.innerHTML = `
  <span>${newTodo.todoValue}</span>
  <span>
  <button class="btn" id="deleteButton">
  <i class="fa-solid fa-trash"></i>
  </button>
  </span>
  `;

  todoLists.appendChild(todoElement);

  const deleteButton = document.querySelector("#deleteButton");
  deleteButton.addEventListener("click", deleteTodo);
};
// DeleteTodo
const deleteTodo = (event) => {
  const selectedTodo = event.target.parentElement.parentElement.parentElement;
  todoLists.removeChild(selectedTodo);
  showMessage("todo is deleted", "danger");
  let todos = getLocalStorageTodos();
  todos = todos.filter((todo) => todo.todoId !== selectedTodo.id);
  localStorage.setItem("myTodos", JSON.stringify(todos));
};
// AddTodo
const addTodo = (e) => {
  e.preventDefault();
  const todoValue = todoInput.value;
  const todoId = Date.now().toString();
  const newTodo = new Todo(todoId, todoValue);

  createTodo(newTodo);
  showMessage("todo is added", "success");
  const todos = getLocalStorageTodos();
  todos.push(newTodo);
  localStorage.setItem("myTodos", JSON.stringify(todos));
};
// local Storage
const getLocalStorageTodos = () => {
  return localStorage.getItem("myTodos")
    ? JSON.parse(localStorage.getItem("myTodos"))
    : [];
};
// load todo
const loadTodo = () => {
  const todos = getLocalStorageTodos();
  todos.map((todo) => createTodo(todo));
};

// addEvenListener
todoForm?.addEventListener("submit", addTodo);
window.addEventListener("DOMContentLoaded", loadTodo);
