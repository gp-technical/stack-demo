
const addRating = () => {

  let ratedProducts = {}

  return ({rating, id}) =>{
console.log(---------------- start--------------)
    let ratedProduct = getPropByKey(ratings, id)
    console.log(ratedProduct)
    if(ratedProduct){

      let productRating = getPropByKey(ratedProduct, rating)

      ratedProducts = productRating ? {...ratedProducts, incrementRating(ratedProduct, rating)} : {...ratedProducts, createRating(ratedProduct, id)}
      console.log(ratedProducts)
    }else{

      ratedProducts = {...ratedProducts, createRatedProduct(ratedProducts, id, rating)}
      console.log(ratedProducts)
    }
console.log('##########################')
    return ratedProducts
    }

}


const getPropByKey= (obj, key) => ( obj[String(key)] )

const incrementRating = (product, key) => ( product[String(key)] = product[String(key)]+1)

const createRating = (product, key) => (product[String(key)] = 1)

const createRatedProduct = (product, key, rating) => (product[String(key)] = {[String(rating)] : rating})
