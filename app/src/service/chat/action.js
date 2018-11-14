import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const types = makeTypes(name, ['send'])
const actions = makeActions(types, { broadcast: true })

export { actions, types }
