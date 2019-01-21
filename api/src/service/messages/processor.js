import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import { sleep } from '@gp-technical/stack-pack-util'

const processor = async (action, app) => {
  var { types, type } = action
  switch (type) {
    case types.messagesProgress:
      for (let i = 0; i <= 100; i++) {
        message.progress({ progress: i, type: 'progress' }, app)
        // eslint-disable-next-line no-await-in-loop
        await sleep(25)
      }
      return 'End of progress action.'
    case types.messagesInfo:
      message.info({ text: 'info message', type: 'info' }, app)
      break
    case types.messagesError:
      message.error({ text: 'error message', type: 'error' }, app)
      break
    case types.messagesCustom:
      message.custom('apiCustom', { text: 'custom message', type: 'custom' }, app)
      break
  }
}

export default makeProcessor(processor)
