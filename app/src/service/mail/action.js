import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const types = makeTypes(name, ['send', 'get_email'])
const actions = makeActions(types, { local: true })

export { actions, types }
