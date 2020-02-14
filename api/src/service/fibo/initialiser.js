import db from './db'

const initialiser = async user => {
  return { sequence: db.getSequence() }
}

export default initialiser
