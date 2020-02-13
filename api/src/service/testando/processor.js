import { makeProcessor } from '@gp-technical/stack-pack-api'

const processor = async action => {
  var { types, type } = action

  switch (type) {
    case types.testandoFromApi:
      return 'VIM DO BACK-END'
  }
}

export default makeProcessor(processor)
