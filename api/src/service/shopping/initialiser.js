import db from './db'

const initialiser = async () => {
  return { products: db.getProducts() }
}

export default initialiser
