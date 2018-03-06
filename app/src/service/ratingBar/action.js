import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const types = makeTypes(name, ['addRating'])
const actions = makeActions(types)

export { actions, types }
