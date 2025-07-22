import { readTodos, writeTodos } from "../fileUtils.js"

export function addTodo(todoText) {
  if (!todoText || todoText.trim() === "") {
    console.error("Error: Todo text cannot be empty")
    return
  }

  const todos = readTodos()
  const newTodo = {
    id: todos.length + 1,
    text: todoText.trim(),
    created: new Date().toISOString(),
  }

  todos.push(newTodo)
  writeTodos(todos)
  console.log(`Added: "${newTodo.text}"`)
}