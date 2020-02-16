class db {
  static boardSquares = Array(9).fill(null) 
  static users = []
  static full = false
  static xIsNext = true

  static enterGame(data) 
  {
    if (this.users.length !== 2) 
    {
      if (this.users.length === 0) 
      {
        this.users = [ ...this.users, { id: data.userId, XO: 'X' } ]
      } 
      else 
      {
        this.users = [ ...this.users, { id: data.userId, XO: 'O' } ]
        this.full = true
      }
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