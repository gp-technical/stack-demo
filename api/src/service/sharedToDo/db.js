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

  static createToDo(todo) {
    const newToDos = [...this.todos, todo]
    this.todos = newToDos
    return newToDos
  }

  static editToDo(todo) {
    const newToDos = this.todos.map(item => (item.id === todo.id ? todo : item))
    this.todos = newToDos
    return newToDos
  }

  static getSingleToDo(id) {
    return this.todos.find(i => i.id === id)
  }

  static getToDosFromUser(socketId) {
    const todos = this.todos.filter(
      todo => todo.ownerId === socketId || (todo.shared.includes(socketId) && todo)
    )
    return todos
  }

  static addUserToLoggedList(token) {
    if (this.loggedUsers.includes(token)) return this.loggedUsers

    const newUsers = [...this.loggedUsers, token]
    this.loggedUsers = newUsers
    return newUsers
  }

  static removeUserFromLoggedList(token) {
    const newUsers = this.loggedUsers.filter(item => item !== token)
    this.loggedUsers = newUsers
    return newUsers
  }
}

export default db
