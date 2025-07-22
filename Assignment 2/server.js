import { addTodo } from "./todos/addTodo.js"
import { listTodos } from "./todos/listTodos.js"
import { deleteTodo } from "./todos/deleteTodo.js"

function main() {
  const args = process.argv.slice(2)
  const command = args[0]

  switch (command) {
    case "add":
      const todoText = args.slice(1).join(" ")
      addTodo(todoText)
      break

    case "list":
      listTodos()
      break

    case "delete":
      const index = args[1]
      deleteTodo(index)
      break

    default:
      console.log("Enter valid commands")
      break
  }
}

main()