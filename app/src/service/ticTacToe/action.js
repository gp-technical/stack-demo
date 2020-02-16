import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = makeTypes(name, [
  'enterGame',
  'setBoardSquares',
  'setXIsNext',
  'resetGame',
  'resetPlay'
])
const actions = { ...makeActions(api, { local: false }) }
const types = { ...api }

export { actions, types }
