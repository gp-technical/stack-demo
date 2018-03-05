
const productRating = () => {

  let ratedProducts = {}

  return ({rating, id}) =>{
console.log('---------------- start--------------')
    let ratedProduct = getPropByKey(ratedProducts, id)
    console.log(ratedProduct)
    if(ratedProduct){

      let productRating = getPropByKey(ratedProduct, rating)

      let updatedProducts = productRating ? incrementRating(ratedProduct, rating) : createRating(ratedProduct, id)
      reatedProducts = {...ratedProducts , ...updatedProducts}
      console.log(ratedProducts)
    }else{

      let createdProduct = createRatedProduct(ratedProducts, id, rating)
      ratedProducts = {...ratedProducts, ...createdProduct}
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

const addProductRating = productRating()

export{addProductRating}
