import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = makeTypes(name, ['fromApi'])
const local = makeTypes(name, ['fromLocal'])
const both = makeTypes(name, ['fromBoth'])

const actions = { ...makeActions(api, { local: false }), ...makeActions(local, { local: true }), ...makeActions(both) }
const types = { ...api, ...local, ...both }

export { actions, types }
