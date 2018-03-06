const reducer = (state = {}, { type, types, data }) => {
  switch (type) {
    case types.ratingBar_init:
      return {...state, ...data}
    case types.ratingBarAddRatingResponse:
      return {...state, ...data}
    default:
      return state
  }
}

export default reducer
