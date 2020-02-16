import React, { useState, Fragment, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { actionHub, services } from '../../loader'


const Square = ({ value, onClick }) => 
  
  <SSquare onClick={onClick}> 
    <Color type={value}>
      {value} 
    </Color>
  </SSquare>


export default ({ isX }) => {
  const dispatch = useDispatch()
  const { selector } = services.ticTacToe

  const [board, setBoard] = useState(null)

  const newBoard = useSelector(state => selector.getBoardSquares(state))
  const xIsNext = useSelector(state => selector.getXIsNext(state))

  useEffect(() => setBoard(newBoard), [newBoard])

  const handleClick = (i, isX) => {
    if (isX === xIsNext) {
      const squares = [...newBoard]
      if (calculateWinner(newBoard) || squares[i]) return 
      squares[i] = xIsNext ? 'X' : 'O'
      dispatch(actionHub.TIC_TAC_TOE_SET_BOARD_SQUARES(squares))
      dispatch(actionHub.TIC_TAC_TOE_SET_X_IS_NEXT(!xIsNext))
    }
  }

  const renderSquare = i => <Square key={i} value={board[i]} onClick={() => handleClick(i, isX)} />


  let status 
  const winner = newBoard && calculateWinner(newBoard)
  status = winner ? `Winner is ${winner}` : `Next: ${xIsNext ? 'X' : 'O'}`

  return (
    <Wrapper>
      <p> {status} </p>
      {
        board &&

          <Board>
            <div>
              { [0,1,2].map(item => renderSquare(item)) }
            </div>
            <div>
              { [3,4,5].map(item => renderSquare(item)) }
            </div>
            <div>
              { [6,7,8].map(item => renderSquare(item)) }
            </div>
          </Board>
      }
    </Wrapper>
  )
}

const calculateWinner = squares => {
  const winningLines = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ]

  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i]

    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a]
    }
  }
  return null
}


const px = n => `${(n * 100) / 1440}vw`

const Board = styled.div`
  display: flex;
  flex-wrap: wrap;

  width: ${px(300)};
`   

const SSquare = styled.div`
  border: 1px solid gray;

  height: ${px(100)};
  width: ${px(100)};

  display: flex;
  justify-content: center;
  align-items: center;
`  

const Color = styled.div`
  color: ${props => props.type === 'X' ? 'red' : 'blue'};
  font-size: ${px(40)};
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`