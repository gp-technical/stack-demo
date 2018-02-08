// import name from './name'
// import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = {} // makeTypes(name, ['delete', 'submit'])
const local = {} // makeTypes(name, ['openDialog', 'closeDialog'])

const actions = {}
//   ...makeActions(api, { local: false }),
//   ...makeActions(local, { local: true })
// }
const types = { ...api, ...local }

export { actions, types }
