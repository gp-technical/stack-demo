import name from './name'

const get = state => {
  return state[name]
}

const getMessage = state => {
  return get(state).message
}

const getEmail = state => {
  return get(state).email
}

const getIsValid = state => {
  return get(state).isValid
}

export default {getMessage, getEmail, getIsValid}
