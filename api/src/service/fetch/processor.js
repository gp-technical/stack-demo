import { makeProcessor } from '@gp-technical/stack-pack-api'

const processor = async action => {
  var { types, type } = action

  switch (type) {
    case types.fetchFromApi:
      return 'Hello from the stack-demo API'
    case types.fetchFromBoth:
      return 'This data was returned by the API and appended to the data returned by the local App'
  }
}

export default makeProcessor(processor)
