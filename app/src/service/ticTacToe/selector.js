import name from './name'

const get = state => {
  return state[name]
}

const getUser = state => {
  return get(state).user
}

const getXO = state => {
  return get(state).XO
}


export default { getUser, getXO }
