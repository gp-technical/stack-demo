


const reducer = (state = {}, action) => {
    const { type, types, data } = action
  
    switch (type) {
  
      case types.ticTacToe_init:
        return { ...state, myId: data.socketId }
  
      case types.ticTacToeFromApiResponse:
        return { ...state, data }
  
      default:
        return state
    }
  }
  
  export default reducer
  