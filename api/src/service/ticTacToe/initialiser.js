import db from './db'
import crypto from 'crypto'

const initialiser = async () => {
  return { 
    userId: crypto.randomBytes(3*4).toString('base64'),
    full: db.full,
    users: db.users,
    boardSquares: db.boardSquares,
    xIsNext: db.xIsNext
  }
}

export default initialiser
