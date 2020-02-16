import db from './db'
import crypto from 'crypto'

const initialiser = async () => {
  return { 
    userId: crypto.randomBytes(3*4).toString('base64'),
    boardSquares: db.boardSquares,
    users: db.users,
    full: db.full,
    xIsNext: db.xIsNext,
    reenablePlay: db.reenablePlay
  }
}

export default initialiser
