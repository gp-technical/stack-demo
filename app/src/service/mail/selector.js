import name from './name'

const get = state => {
  return state[name]
}

const getEmail = state => {
  return get(state).email
}

const getIsValid = state => {
  return get(state).isValid
}

const getStatus = state => {
  return get(state).status
}

const getLoading = state => {
  return get(state).loading
}

export default {getEmail, getIsValid, getStatus, getLoading}
