import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const fileName = fileURLToPath(import.meta.url)
const dirName = path.dirname(fileName)
const todosFile = path.join(dirName, "todos.json")

export function readTodos() {
  try {
    if (!fs.existsSync(todosFile)) {
      return []
    }
    const data = fs.readFileSync(todosFile, "utf8")
    return JSON.parse(data)
  } catch (error) {
    console.error("Error reading todos file:", error.message)
    return []
  }
}

export function writeTodos(todos) {
  try {
    fs.writeFileSync(todosFile, JSON.stringify(todos, null, 2))
  } catch (error) {
    console.error("Error writing todos file:", error.message)
  }
}