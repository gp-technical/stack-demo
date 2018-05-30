import { makeProcessor } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  var { types, type, data } = action

  switch (type) {
    case types.todosCreate:
      db.add(data.value)
      return db.getTodos()
    case types.todosUpdate:
      db.update(data.id, data.value)
      return db.getTodos()
    case types.todosDelete:
      db.delete(data.id)
      return db.getTodos()
  }
}

export default makeProcessor(processor)
