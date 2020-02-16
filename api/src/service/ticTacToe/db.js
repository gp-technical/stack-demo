class db {
  static boardSquares = Array(9).fill(null) 
  static users = []
  static full = false
  static xIsNext = true
  static lastPlayer = ''

  static enterGame(data) 
  {
    if (data.userId !== this.lastPlayer) {
      if (this.users.length !== 2) {
        if (this.users.length === 0) {
          this.users = [ ...this.users, { id: data.userId, XO: 'X' } ]
        } else {
          this.users = [ ...this.users, { id: data.userId, XO: 'O' } ]
          this.full = true
        }
      } 

      this.lastPlayer = data.userId
    } 

    return this.users
  }

  static setBoardSquares(squares) {
    this.boardSquares = squares
    return this.boardSquares
  }

  static setXIsNext(x) {
    this.xIsNext = x
    return this.xIsNext
  }
}

export default db