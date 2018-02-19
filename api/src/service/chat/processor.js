import { makeProcessor } from '@gp-technical/stack-pack-api'

import { add } from './db'

const processor = async action => {
  const { types, type, data, user, app } = action
  switch (type) {
    case types.chatBroadcast:
      return add(user, app, data)
  }
}

export default makeProcessor(processor)
