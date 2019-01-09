const reducer = (state = {}, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.todos_init:
    case types.todosCreateResponse:
    case types.todosUpdateResponse:
    case types.todosDeleteResponse:
      return { ...state, list: data }
    default:
      return state
  }
}

export default reducer
