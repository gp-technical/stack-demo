import { makeProcessor } from '@gp-technical/stack-pack-api'

const processor = async action => {
  // eslint-disable-next-line no-unused-vars
  var { types, type, user, data } = action

}

export default makeProcessor(processor)
