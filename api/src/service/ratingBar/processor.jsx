import { makeProcessor, message} from '@gp-technical/stack-pack-api'
import { addProductRating } from './ratingUtils'


const processor = async ({types, type, data})=> {
  switch (type) {
    case types.ratingBarAddRating:
      let updatedRatings = addProductRating(data.rating, data.id)
      //message.custom('chatBroadcast', msg)
      return updatedRatings
  }
}

export default makeProcessor(processor)
