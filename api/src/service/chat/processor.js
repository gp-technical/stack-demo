import { makeProcessor } from '@gp-technical/stack-pack-api'
import { add } from './db'

const processor = async action => {
  const { types, type, data, user } = action
  switch (type) {
    case types.chatSend:
      return add(user, data)
  }
}

export default makeProcessor(processor)
