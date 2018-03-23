const reducer = (state = {}, action) => {
  const {type, types, data} = action
  switch (type) {
    case types.mailChange:
      return {...state, email: data}
    case types.mailValidate:
      return {...state, isValid: data}
    case types.mailMessage:
      return {...state, message: data}
    default:
      return state
  }
}

export default reducer
