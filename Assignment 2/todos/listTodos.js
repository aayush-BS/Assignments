import { readTodos } from "../fileUtils.js"

export function listTodos() {
  const todos = readTodos()

  if (todos.length === 0) {
    console.log("No todos found.")
    return
  }

  console.log("Your todos:")
  todos.forEach((todo, index) => {
    console.log(`${index + 1}. ${todo.text}`)
  })
}