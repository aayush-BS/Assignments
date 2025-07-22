import { readTodos, writeTodos } from "../fileUtils.js"

export function deleteTodo(index) {
  const todoIndex = Number.parseInt(index)

  if (isNaN(todoIndex) || todoIndex < 1) {
    console.error("Error: Please provide a valid todo number")
    return
  }

  const todos = readTodos()

  if (todoIndex > todos.length) {
    console.error("Error: Todo number does not exist")
    return
  }

  const deletedTodo = todos.splice(todoIndex - 1, 1)[0]
  writeTodos(todos)
  console.log(`Deleted: "${deletedTodo.text}"`)
}