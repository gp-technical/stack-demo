import db from './db'

const initialiser = async user => {
  return { total: db.getTotal() }
}

export default initialiser
