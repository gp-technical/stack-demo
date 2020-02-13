import db from './db'
const uuid = require('uuid/v4')

const initialiser = async user => {
  return { user, uuid: uuid(), todos: db.todos }
}

export default initialiser
