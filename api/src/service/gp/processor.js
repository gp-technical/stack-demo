import gpapi from 'stack-pack-gpapi'

import { makeProcessor } from '@gp-technical/stack-pack-api'

const processor = async action => {
  var { types, type, data } = action

  switch (type) {
    case types.gpGetDocuments:
      return await gpapi.get(`folder/${data}/items/simple`)
  }
}

export default makeProcessor(processor)
