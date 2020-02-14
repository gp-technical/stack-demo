import { makeProcessor } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  // eslint-disable-next-line no-unused-vars
  var { types, type, user, data } = action

  switch (type) {
    case types.fiboNext:
      db.next()
      return { sequence: db.getSequence() }
    case types.fiboBigNumber:
      db.bigNumber()
      return { sequence: db.getSequence() }
  }
}

export default makeProcessor(processor)
