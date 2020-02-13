import name from './name'

const get = state => {
  return state[name]
}

const getData = state => {
  return get(state).data
}

const getSource = state => {
  return get(state).source
}

export default { getData, getSource }
