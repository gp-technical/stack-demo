import React, { useState, Fragment } from 'react'
import styled from 'styled-components'


const Square = ({ value, onClick }) => 
    
    <SSquare onClick={onClick}> 
        <Color type={value}>
            {value} 
        </Color>
    </SSquare>


export default ({ isX }) =>
{
    const [boardSquares, setBoardSquares] = useState(Array(9).fill(null))
    const [xIsNext, setXIsNext] = useState(true)

    const handleClick = (i, isX) =>
    {
        if (isX === xIsNext) {
            const squares = [...boardSquares]

            if (calculateWinner(boardSquares) || squares[i]) return 

            squares[i] = xIsNext ? 'X' : 'O'

            setBoardSquares(squares)
            setXIsNext(!xIsNext)
        }
    }

    const renderSquare = i => <Square value={boardSquares[i]} onClick={() => handleClick(i, isX)} />

    let status 
    const winner = calculateWinner(boardSquares)
    status = winner ? `Winner is ${winner}` : `Next: ${xIsNext ? 'X' : 'O'}`

    return (
        <Fragment>
            <p> {status} </p>
            <Board>
                <div>
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div>
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div>
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>

            </Board>
        </Fragment>
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

    for (let i = 0; i < winningLines.length; i++)
    {
        const [a, b, c] = winningLines[i]

        if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c])
        {
            return squares[a]
        }
    }
    return null
}


const px = n => `${(n * 100) / 1440}vw`

const Board = styled.div`
    display: flex;
    flex-wrap: wrap;

    width: ${px(210)};
`   

const SSquare = styled.div`
    border: 1px solid gray;

    height: ${px(70)};
    width: ${px(70)};

    display: flex;
    justify-content: center;
    align-items: center;
`  

const Color = styled.div`
    color: ${props => props.type === 'X' ? 'red' : 'blue'};
    font-size: ${px(40)};
`