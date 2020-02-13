import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const local = makeTypes(name, ['fromLocal'])
const api = makeTypes(name, ['fromApi'])


const actions = {
  ...makeActions(api, { local: false }),
  ...makeActions(local, { local: true })
}
const types = { ...api, ...local }

export { actions, types }
