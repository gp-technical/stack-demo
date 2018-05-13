import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import { add } from './db'

const processor = async action => {
  const { types, type, data, user } = action
  switch (type) {
    case types.chatSend:
      const msg = add(user, data)
      message.custom('chatBroadcast', msg)
  }
}

export default makeProcessor(processor)
