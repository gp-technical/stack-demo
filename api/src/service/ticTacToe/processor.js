import { makeProcessor } from '@gp-technical/stack-pack-api'

const processor = async action => {
  var { types, type } = action

  switch (type) {
    case types.ticTacToeFromApi:
      return {...state}
  }
}

export default makeProcessor(processor)
