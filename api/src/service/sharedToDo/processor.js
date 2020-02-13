import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  const { types, type, data } = action
  switch (type) {
    case types.sharedToDoAddToLoggedUsers: {
      db.addUserToLoggedList(data)
      message.custom('sharedToDoLoggedUsers', { loggedUsers: db.loggedUsers })
      break
    }

    case types.sharedToDoRemoveFromLoggedUsers: {
      db.removeUserFromLoggedList(data)
      message.custom('sharedToDoLoggedUsers', { loggedUsers: db.loggedUsers })
      break
    }

    case types.sharedToDoAddToDo: {
      db.createToDo(data)
      message.custom('sharedToDoAddToDoResponse', { todos: db.todos })
      break
    }

    case types.sharedToDoEditToDo: {
      db.editToDo(data)
      message.custom('sharedToDoEditToDoResponse', { todos: db.todos })
      break
    }
  }
}

export default makeProcessor(processor)
