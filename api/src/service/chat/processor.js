import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import { add } from './db'

const processor = async action => {
  const { types, type, data, user, app } = action
  switch (type) {
    case types.chatSend:
      const msg = add(user, app, data)
      message.custom('chatBroadcast', msg)
  }
}

export default makeProcessor(processor)
