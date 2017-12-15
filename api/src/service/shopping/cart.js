var carts = {}

const userId = user => {
  return user.nameId
}

const nextInCartId = cart => {
  return cart.reduce((accumulator, current) => {
    return current.inCartId + accumulator
  }, 1)
}

const setCartForUser = (newCart, user) => {
  let updatedCarts = { ...carts }
  updatedCarts[userId(user)] = newCart

  carts = updatedCarts
}

const getCartForUser = user => {
  if (user === undefined) {
    return []
  }

  let cartKey = userId(user)
  if (!carts.hasOwnProperty(cartKey)) {
    setCartForUser([], user)
  }
  return carts[cartKey]
}

const productCartAdd = (product, user) => {
  let cart = getCartForUser(user)
  let addedProduct = { ...product, inCartId: nextInCartId(cart) }

  setCartForUser([ ...cart, addedProduct ], user)

  return addedProduct
}

const productCartRemove = (productToRemove, user) => {
  let cart = getCartForUser(user)
  let updatedCart = cart.filter((product) => {
    return product.inCartId !== productToRemove.inCartId
  })

  setCartForUser(updatedCart, user)
}

const productCartRemoveAll = (user) => {
  setCartForUser([], user)
}

export default {
  getCartForUser,
  productCartAdd,
  productCartRemove,
  productCartRemoveAll
}
