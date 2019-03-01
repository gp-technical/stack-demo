import name from './name'

const get = state => {
  return state[name]
}

const getApiData = state => {
  return get(state).result
}

const getMessageData = state => {
  return get(state).message
}

export default {
  getApiData,
  getMessageData
}
