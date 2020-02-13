import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const Cell = ({ value, clicked, cellNum }) => 

    <SCell onClick={() => clicked(cellNum)}> {value} </SCell>


export default () => 
{
    const initData =
    {
        cells: Array.apply(null, {length: 9}).map(x => ''),
        symbol: 'X'
    }

    const [cells, setCells] = useState(initData.cells)
    const [symbol, setSymbol] = useState(initData.symbol)



    const winningStates = 
    [
        '111000000',
        '000111000',
        '000000111',
        '100100100',
        '010010010',
        '100010001',
        '001010100'
    ]

    const moveBitmap = symbol => cells.map(x => x === symbol ? 1: 0).join('')

    const checkWinner = symbol =>
    {
        for (let i of winningStates)
        {
            if ( (parseInt(moveBitmap(symbol), 2) & parseInt(i, 2)) === parseInt(i, 2) )
            {
                alert(`${symbol} won! New Game?`)
                newGame( )
            }
        }
    }




    const clicked = x => 
    {
        const newCellData = Array(...cells)
        if (!newCellData[x])
        {
            newCellData[x] = symbol
            setCells(newCellData)
            setSymbol(symbol === 'X' ? 'O' : 'X')
        }
    }

    const newGame = () => // reseting board
    {
        setCells(initData.cells)
        setSymbol(initData.symbol)
    }

    const vCells = []
    for(let i=0; i<9; i++)
    {
        vCells.push(
            <Cell 
                value={cells[i]} 
                cellNum={i}
                clicked={clicked}
            />
        )
    }


    useEffect(() => checkWinner(symbol === 'X' ? 'O' : 'X'))


    return (
        <div>  

            <SBoard>
                {vCells}
            </SBoard>

            <p> Next Move: {symbol} </p>

        </div>
    )
}


const SCell = styled.div`
    border: 1px solid #bbb;
    height: 50px;
    width: 50px;
`   

const SBoard = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 156px;
`   