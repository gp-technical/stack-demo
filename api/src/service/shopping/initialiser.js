import db from './db'
import cart from './cart'

const initialiser = async (user) => {
  return {
    products: db.getProducts(),
    categories: db.getCategories(),
    productsInCart: cart.getCartForUser(user),
    priceRange: db.getPriceRange()
  }
}

export default initialiser
