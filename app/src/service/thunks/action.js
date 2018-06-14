import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'
import { actionHub } from '../../loader'

const api = makeTypes(name, ['getAnswer'])
const local = makeTypes(name, ['start', 'finish'])

const actions = { ...makeActions(api), ...makeActions(local) }
const types = { ...api, ...local }

const thunksGetAnswer = actions.thunksGetAnswer
actions.thunksGetAnswer = () => {
  return async (dispatch, getState) => {
    dispatch(actionHub.THUNKS_START())
    await dispatch(thunksGetAnswer())
    dispatch(actionHub.THUNKS_FINISH())
  }
}

export { actions, types }
