import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  const { types, type, data, app } = action
  switch (type) {
    case types.authenticate: {
      db.addUserToLoggedList(app)
      message.custom('sharedToDoLoggedUsers', { loggedUsers: db.loggedUsers })
      break
    }

    case types.disconnect: {
      db.removeUserFromLoggedList(app)
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

    case types.sharedToDoEditToDo: {
      const clientsToListen = db.getSingleToDo(data.id).shared
      clientsToListen.push(...data.shared)
      const ClientsToListenSet = [...new Set(clientsToListen)]
      db.editTodo(data)
      message.custom('sharedToDoEditToDoResponse', { todos: db.todos }, data.ownerId)
      ClientsToListenSet.map(sharedId =>
        message.custom('sharedToDoEditToDoResponse', { todos: db.todos }, sharedId)
      )
      break
    }
  }
}

export default makeProcessor(processor)
