import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const types = makeTypes(name, ['broadcast'])
const actions = makeActions(types)

export { actions, types }
