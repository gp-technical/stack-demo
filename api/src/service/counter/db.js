class db {
  static total = 0
  static increment() {
    this.total++
  }
  static decrement() {
    this.total--
  }
  static getTotal() {
    return this.total
  }
}

export default db
