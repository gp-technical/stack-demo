const getCookie = name => 
{
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}

const reducer = (state = {}, action) => {
  const { type, types, data } = action

  switch (type) {

    case types.ticTacToe_init:
    {
      if (!document.cookie.includes('userId')) {
        document.cookie = `userId=${data.userId}`    
        return { 
          ...state, 
          userId: data.userId,
          full: data.full,
          users: data.users,
          boardSquares: data.boardSquares,
          xIsNext: data.xIsNext
        }
      } else {
        return { 
          ...state, 
          userId: getCookie('userId'),
          full: data.full,
          users: data.users,
          boardSquares: data.boardSquares,
          xIsNext: data.xIsNext
        }
      }
    }

    case types.ticTacToeGetUsers:
      return { ...state, users: data.users }

    case types.ticTacToeIsFull:
      return { ...state, full: data.full }

    case types.ticTacToeGetBoardsquares:
      return { ...state, boardSquares: data.boardSquares }

    case types.ticTacToeGetXIsNext:
      return { ...state, xIsNext: data.xIsNext }

    default:
      return state
  }
}

export default reducer
