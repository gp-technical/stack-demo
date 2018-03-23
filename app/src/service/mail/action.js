import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'
import { actionHub } from '../../loader'

const types = makeTypes(name, ['change', 'validate', 'client', 'message'])
const actions = makeActions(types)

actions.mailClientResponse = (data) => {
  return (dispatch) => {
    console.log('olha que loko, caiu aqui', data)
  }
}

export { actions, types }
