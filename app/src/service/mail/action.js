import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const types = makeTypes(name, ['change', 'validate', 'client', 'message'])
const actions = makeActions(types)

export { actions, types }
