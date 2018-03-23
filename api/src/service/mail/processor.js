import { makeProcessor } from "@gp-technical/stack-pack-api"
import emailAPI from './emailAPI'

const processor = async action => {
  var { types, type, data } = action
  switch (type) {
    case types.mailClient:
      return {
        emailClient: emailAPI(data)
      }
  }
}

export default makeProcessor(processor)
