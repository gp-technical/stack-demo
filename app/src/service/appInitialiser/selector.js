import name from './name'

const get = state => {
  return state[name]
}

const getBackgroundColor = state => {
  return get(state).backgroundColor
}

export default { getBackgroundColor }
