import { makeProcessor } from '@gp-technical/stack-pack-api'

const processor = async action => {
  var { types, type } = action
  switch (type) {
    case types.errorsThrowFromApi:
      throw new Error('This is a test error that was thrown by the stack-demo API')
  }
}

export default makeProcessor(processor)
