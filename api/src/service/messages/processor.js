import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import { sleep } from '@gp-technical/stack-pack-util'

const processor = async (action, app) => {
  var { types, type } = action
  switch (type) {
    case types.messagesInfo:
      message.info({ message: { text: 'info message', type: 'info' } }, app)
      return { result: { text: 'Result returned from the API info action' } }
    case types.messagesProgress:
      for (let i = 0; i <= 100; i++) {
        message.progress(
          {
            message: { progress: i, type: 'progress' },
            result: { text: 'Waiting for process to finish...' }
          },
          app
        )
        // eslint-disable-next-line no-await-in-loop
        await sleep(50)
      }
      return { result: { text: 'End of progress action.' } }
    case types.messagesError:
      message.error({ message: { text: 'error message', type: 'error' } }, app)
      return { result: { text: 'Return from the API error action' } }
    case types.messagesCustom:
      message.custom('apiCustom', { message: { text: 'custom message', type: 'custom' } }, app)
      return { result: { text: 'Return from the API custom' } }
  }
}

export default makeProcessor(processor)
