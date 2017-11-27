const reducer = (state = { productsInCard: [] }, action) => {
  const { type, types, data } = action

  switch (type) {
    case types.shopping_init:
      const { products } = data
      return { ...state, products }
    case types.shoppingAddProductToCard:
      return { ...state, productsInCard: state.productsInCard.concat(data) }
    case types.shoppingRemoveProductFromCard:
      // Immutable remove element from array
      // 1 - make a copy, 2 - find index, 3 - splice copy
      const productsInCard = state.productsInCard.slice()

      const productToRemoveIndex = productsInCard.findIndex((product) => {
        return product.id === data.id
      })
      productsInCard.splice(productToRemoveIndex, 1)
      return { ...state, productsInCard: productsInCard }
    case types.shoppingCheckoutCard:
      return { ...state, isHandlingCheckout: true }
    case types.shoppingCheckoutCardResponse:
      return { ...state, isHandlingCheckout: false, checkoutCompleted: data.checkoutCompleted, productsInCard: [] }
    case types.shoppingResetCard:
      return { ...state, checkoutCompleted: false }
    case types.shoppingSearchProductsResponse:
      return { ...state, products: data.products }
    default:
      return state
  }
}

export default reducer
