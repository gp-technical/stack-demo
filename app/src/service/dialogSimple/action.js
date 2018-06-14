import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = makeTypes(name, ['delete', 'submit'])
const local = makeTypes(name, ['openDialog', 'closeDialog'])

const actions = {
  ...makeActions(api),
  ...makeActions(local)
}
const types = { ...api, ...local }

export { actions, types }
