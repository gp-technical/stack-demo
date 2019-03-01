var productsInCart = []

const getProductsInCart = () => {
  return productsInCart
}

const productCartAdd = product => {
  let inCartId = productsInCart.reduce((accumulator, current) => {
    return current.inCartId + accumulator
  }, 1)
  let addedProduct = { ...product, inCartId: inCartId }
  productsInCart = [...productsInCart, addedProduct]
  return addedProduct
}

const productCartRemove = productToRemove => {
  productsInCart = productsInCart.filter(product => {
    return product.inCartId !== productToRemove.inCartId
  })
}

const productCartRemoveAll = () => {
  productsInCart = []
}

export default {
  getProductsInCart,
  productCartAdd,
  productCartRemove,
  productCartRemoveAll
}
