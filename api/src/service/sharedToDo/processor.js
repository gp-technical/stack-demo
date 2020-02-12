import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  // eslint-disable-next-line no-unused-vars
  const { types, type, user, data, app } = action
  console.log(action)
  switch (type) {
    case types.authenticate: {
      db.addUserToLoggedList(app)
      message.custom('sharedToDoLoggedUsers', { loggedUsers: db.loggedUsers })
      break
    }

    case types.sharedToDoAddToDo: {
      db.createTodo(data)
      message.custom('sharedToDoAddToDoResponse', { todos: db.todos }, data.ownerId)
      data.shared.map(sharedId =>
        message.custom('sharedToDoAddToDoResponse', { todos: db.todos }, sharedId)
      )
      // already messaging everyone that matters about the todos
      // don't need to send a sharedToDoAddToDoResponse here
      break
    }
  }
}

export default makeProcessor(processor)
