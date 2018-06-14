import { makeProcessor } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  // eslint-disable-next-line no-unused-vars
  var { types, type, user, data } = action

  switch (type) {
    case types.counterIncrement:
      db.increment()
      return { total: db.getTotal() }
    case types.counterDecrement:
      db.decrement()
      return { total: db.getTotal() }
    case types.counterGetTotal:
      return { total: db.getTotal() }
  }
}

export default makeProcessor(processor)
