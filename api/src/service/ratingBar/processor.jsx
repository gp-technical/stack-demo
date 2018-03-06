import { makeProcessor, message} from '@gp-technical/stack-pack-api'
import { addProductRating } from './ratingUtils'


const processor = async ({types, type, data})=> {

  switch (type) {
    case types.ratingBarAddRating:
    console.log('Add RATINGg')

      let{rating, product: {id} = null} = data
      let updatedRatings = addProductRating(rating, id)
      //message.custom('chatBroadcast', msg)
      return {...state, ...updatedRatings}
  }
}

export default makeProcessor(processor)
