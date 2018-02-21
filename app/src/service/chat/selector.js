import name from './name'

const get = state => {
  return state[name]
}

const getMessages = state => {
  return get(state).messages
}

export default { getMessages }
