import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = makeTypes(name, ['addToDo', 'editToDo', 'deleteToDo', 'setShared'])

const local = makeTypes(name, ['setLocalToDo'])

const actions = {
  ...makeActions(api, { local: false }),
  ...makeActions(local, { local: true })
}

const types = {
  ...api,
  ...local
}

export { actions, types }
