import { makeProcessor } from '@gp-technical/stack-pack-api'
import { sleep } from '@gp-technical/stack-pack-util'

const processor = async action => {
  // eslint-disable-next-line no-unused-vars
  var { types, type, data } = action
  switch (type) {
    case types.thunksGetAnswer:
      await sleep(3000)
      return { answer: 42 }
  }
}

export default makeProcessor(processor)
