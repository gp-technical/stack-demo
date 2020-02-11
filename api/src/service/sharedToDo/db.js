class db {
  static todos = [
    // {
    //   id: 1,
    //   ownerId: socketId,
    //   text: some text,
    //   done: false or true,
    //   shared: [] of socketId that can see it
    // }
  ]

  static createTodo(todo) {
    const newTodos = [...this.todos, todo]
    return newTodos
  }

  static getTodosFromUser(socketId) {
    const todos = this.todos.filter(
      todo => todo.ownerId === socketId || (todo.shared.includes(socketId) && todo)
    )
    return todos
  }
}

export default db
