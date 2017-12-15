import { makeProcessor } from '@gp-technical/stack-pack-api'
import { sleep } from '@gp-technical/stack-pack-util'
import db from './db'
import cart from './cart'

const processor = async action => {
  var { types, type, data, user } = action

  switch (type) {
    case types.shoppingCartCheckout:
      await sleep(5000)
      cart.productCartRemoveAll(user)
      return {
        isCheckoutCompleted: true,
        productsInCart: cart.getCartForUser(user)
      }
    case types.shoppingProductCartAdd:
      let productAdded = cart.productCartAdd(data, user)
      return {
        productsInCart: cart.getCartForUser(user),
        productAdded: productAdded
      }
    case types.shoppingProductCartRemove:
      cart.productCartRemove(data, user)
      return { productsInCart: cart.getCartForUser(user) }
    case types.shoppingProductSearch:
      return { products: db.queryProducts(data) }
    case types.shoppingProductFilterByCategory:
      return { products: db.queryCategories(data) }
    case types.shoppingProductFilterByPriceRange:
      return { products: db.queryPriceRange(data) }
  }
}

export default makeProcessor(processor)
