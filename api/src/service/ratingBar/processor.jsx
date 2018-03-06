import { makeProcessor, message} from '@gp-technical/stack-pack-api'
import { addProductRating } from './ratingUtils'


const processor = async ({types, type, data})=> {

  switch (type) {
    case types.ratingBarAddRating:
    console.log(types)
    console.log('###################')
console.log(data)
console.log(data.rating, data.description.id)
      let updatedRatings = addProductRating(data.rating, data.description.id)
      //message.custom('chatBroadcast', msg)
      return updatedRatings
  }
}

export default makeProcessor(processor)
