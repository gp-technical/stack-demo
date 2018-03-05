import { makeProcessor, message} from '@gp-technical/stack-pack-api'
import { addProductRating } from './ratingUtils'


const processor = async ({types, type, data})=> {
console.log(types)
  switch (type) {
    case types.addRating:

      let{rating, product: {id} = null} = data
      let updatedRatings = addProductRating(rating, id)
      //message.custom('chatBroadcast', msg)
      return {...state, ...updatedRatings}
  }
}

export default makeProcessor(processor)
