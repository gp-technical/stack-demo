class db {
  static todos = []

  static add(value) {
    this.todos.push(value)
  }

  static update(id, value) {
    if (id < this.todos.length) {
      this.todos[id] = value
    }
  }

  static delete(id) {
    if (id < this.todos.length) {
      this.todos.splice(id, 1)
    }
  }
  static getTodos() {
    return this.todos
  }
}

export default db
