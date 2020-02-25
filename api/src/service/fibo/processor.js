import { makeProcessor } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  // eslint-disable-next-line no-unused-vars
  var { types, type, user, data, app } = action
  switch (type) {
    case types.fiboNext:
      db.next(app)
      return { sequence: db.getSequence(app) }
    case types.fiboBigNumber:
      db.bigNumber(app)
      return { sequence: db.getSequence(app) }
  }
}

export default makeProcessor(processor)
