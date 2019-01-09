import { makeProcessor } from '@gp-technical/stack-pack-api'
import calculator from './calculator'

const processor = async action => {
  var { types, type, data } = action
  switch (type) {
    case types.sphereGetVolume:
      return {
        volume: calculator.getVolume(data)
      }
  }
}

export default makeProcessor(processor)
