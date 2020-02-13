import name from './name'

const get = state => {
  return state[name]
}

const getData = state => {
  return get(state).data
}

const getId = state => get(state).myId


export default { getData, getId }
