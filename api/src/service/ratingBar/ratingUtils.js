const productRating = () => {
  let ratedProducts = {}

  return (rating, id) => {
    let ratedProduct = getPropByKey(ratedProducts, id)
    if (ratedProduct) {
      let productRating = getPropByKey(ratedProduct, rating)
      let updatedProduct = productRating
        ? incrementRating(ratedProducts, id, rating)
        : createRating(ratedProducts, id, rating)
      ratedProducts = { ...ratedProducts, ...updatedProduct }
    } else {
      // eslint-disable-next-line no-unused-vars
      let createdProduct = createRatedProduct(ratedProducts, id, rating)
    }
    return ratedProducts
  }
}

const getPropByKey = (obj, key) => obj[String(key)]
const incrementRating = (product, key, rating) => (product[String(key)][rating] = product[String(key)][String(rating)] + 1)
const createRating = (product, key, rating) => (product[String(key)][String(rating)] = 1)
const createRatedProduct = (product, key, rating) => (product[String(key)] = { [String(rating)]: 1 })
const addProductRating = productRating()

export { addProductRating }
