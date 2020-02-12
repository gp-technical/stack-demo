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
  static loggedUsers = []

  static createTodo(todo) {
    const newTodos = [...this.todos, todo]
    this.todos = newTodos
    return newTodos
  }

  static editTodo(todo) {
    const newTodos = this.todos.map(item => (item.id === todo.id ? todo : item))
    this.todos = newTodos
    return newTodos
  }

  static getSingleToDo(id) {
    return this.todos.find(i => i.id === id)
  }

  static getTodosFromUser(socketId) {
    const todos = this.todos.filter(
      todo => todo.ownerId === socketId || (todo.shared.includes(socketId) && todo)
    )
    return todos
  }

  static addUserToLoggedList(userId) {
    const newUsers = [...this.loggedUsers, userId]
    this.loggedUsers = newUsers
    return newUsers
  }

  static removeUserFromLoggedList(userId) {
    const newUsers = this.loggedUsers.filter(item => item !== userId)
    this.loggedUsers = newUsers
    return newUsers
  }
}

export default db
