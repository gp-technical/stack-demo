import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import { sleep } from '@gp-technical/stack-pack-util'

const processor = async (action, app) => {
  var { types, type } = action

  switch (type) {
    case types.messagesInfo:
      message.info('text from message info', app)
      return 'text from api info'
    case types.messagesProgress:
      message.progress(`text from message progress. API will respond in 3 seconds.`, app)
      await sleep(3000)
      return 'text from api progress'
    case types.messagesError:
      message.error('text from message error', app)
      return 'text from api error'
    case types.messagesCustom:
      message.custom('apiCustom', 'text from message custom', app)
      return 'text from api custom'
  }
}

export default makeProcessor(processor)
