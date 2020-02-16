import { makeProcessor, message } from '@gp-technical/stack-pack-api'
import db from './db'

const processor = async action => {
  var { types, type, data } = action

  switch (type) {

    case types.ticTacToeEnterGame: {
      db.enterGame(data)
      message.custom('ticTacToeGetUsers', { users: db.users })
      message.custom('ticTacToeIsFull', { full: db.full })
      break
    }

    case types.ticTacToeSetBoardSquares: {
      db.setBoardSquares(data)
      message.custom('ticTacToeGetBoardsquares', { boardSquares: db.boardSquares })
      break
    }

    case types.ticTacToeSetXIsNext: {
      db.setXIsNext(data)
      message.custom('ticTacToeGetXIsNext', { xIsNext: db.xIsNext })
      break
    }

  }
}

export default makeProcessor(processor)
