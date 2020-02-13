import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = makeTypes(name, ['fromApi'])

const actions = {
  ...makeActions(api, { local: false }),
}
const types = { ...api }

export { actions, types }
