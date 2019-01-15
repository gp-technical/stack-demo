import name from './name'

const get = state => {
  return state[name]
}

const getApiData = state => {
  return get(state).apiText
}

const getMessageData = state => {
  return get(state).messageText
}

export default {
  getApiData,
  getMessageData
}
