import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = makeTypes(name, ['addToDo', 'editToDo', 'addToLoggedUsers', 'removeFromLoggedUsers'])

const local = makeTypes(name, [
  'setLocalToDo',
  'setEditedToDo',
  'toggleEditDialog',
  'toggleOnlyMyToDo'
])

const actions = {
  ...makeActions(api, { local: false }),
  ...makeActions(local, { local: true })
}

const types = {
  ...api,
  ...local
}

export { actions, types }
