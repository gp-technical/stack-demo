import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const types = makeTypes(name, ['componentVisible', 'componentHidden', 'clicked'])
const actions = makeActions(types)

export { actions, types }
