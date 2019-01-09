import name from './name'

const get = state => {
  return state[name]
}

const getLog = state => {
  return get(state).log
}

export default { get, getLog }
