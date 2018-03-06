import name from './name'

const getProductRatingScores = (state, products) => {
  let ratedProducts = getRatedProducts(state)
  return products.reduce((acc, {id}) => {
    if (id) {
      acc[id] = ratedProducts[id] ? getRatingScore(ratedProducts[id]) : 0
    }
    return acc
  }, {})
}

const getNumberOfProductReviewers = (state, products) => {
  let ratedProducts = getRatedProducts(state)
  return products.reduce((acc, {id}) => {
    if (id) {
      acc[id] = ratedProducts[id] ? getNumberReviewers(ratedProducts[id]) : 0
    }
    return acc
  }, {})
}

const getMedianProductScores = (state, products) => {
  let ratedProducts = getRatedProducts(state)
  return products.reduce((acc, {id}) => {
    if (id) {
      acc[id] = ratedProducts[id] ? getMedianScore(ratedProducts[id]) : 0
    }
    return acc
  }, {})
}

const getRatedProducts = (state) => (state[name])

const getRatingScore = (ratingObj) => {
  let count = 0
  let sum = Object.values(ratingObj).reduce((acc, next, index) => {
    count += index
    return acc + next * (index + 1)
  }, 0)
  return sum / count
}

const getNumberReviewers = (ratingObj) => {
  return Object.values(ratingObj).reduce((acc, next) => {
    acc = acc + next
    return acc
  }, 0)
}

const getMedianScore = (ratingObj) => {
  let values = Object.values(ratingObj)
  values.sort((a, b) => a - b)
  return (values[(values.length - 1) >> 1] + values[values.length >> 1]) / 2
}

export default { getProductRatingScores, getNumberOfProductReviewers, getMedianProductScores }
