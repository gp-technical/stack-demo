import { makeProcessor } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  // eslint-disable-next-line no-unused-vars
  const { types, type, user, data } = action
  switch (type) {
    case types.sharedToDoAddTodo: {
      db.createTodo(data)
      return { todos: db.todos }
    }
  }
}

export default makeProcessor(processor)
