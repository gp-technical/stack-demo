import name from './name'

const get = state => {
  return state[name]
}

const getProductsInCard = state => {
  return get(state).productsInCard
}

const getProducts = state => {
  return get(state).products
}

const getHandlingCheckout = state => {
  return get(state).isHandlingCheckout
}

const getCheckoutCompleted = state => {
  return get(state).checkoutCompleted
}

export default { getProducts, getProductsInCard, getHandlingCheckout, getCheckoutCompleted }
