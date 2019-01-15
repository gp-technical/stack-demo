import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = makeTypes(name, ['info', 'progress', 'error', 'custom'])

const actions = {
  ...makeActions(api)
}

const types = {
  ...api
}

export { actions, types }
