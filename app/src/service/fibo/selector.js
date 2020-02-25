import name from './name'

const get = state => {
  return state[name]
}

const getSequence = state => {
  return get(state).sequence
}

export default { getSequence }
