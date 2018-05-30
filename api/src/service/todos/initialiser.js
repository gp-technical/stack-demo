import db from './db'

const initialiser = async () => {
  return db.getTodos()
}

export default initialiser
