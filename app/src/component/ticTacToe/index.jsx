import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { actionHub, services, components } from '../../loader'
import styled from 'styled-components'
import Switch from '@material-ui/core/Switch'

import Game from './game'


export default () =>
{
    const { selector } = services.ticTacToe

    const user = useSelector(state => selector.getUser(state))


    const [checked, setChecked] = useState(false)

    return (
        <components.Box>
            <Wrapper>

                <h3> TIC TAC TOE </h3>
                <Subtitle>
                    <p> User: {user}</p>
                    <XOBox>
                        <p> X </p>
                        <Switch
                            checked={checked}
                            onChange={() => setChecked(!checked)}
                            value='checkedA'
                            color='primary'
                        />
                        <p> O </p>
                    </XOBox>
                </Subtitle>

                <Main>
                    <GameBoard>

                        <Game isX={!checked} />

                    </GameBoard>
                </Main>


            </Wrapper>
        </components.Box>
    )
}

const Wrapper = styled.div`
    height: 35vw;
    width: 100%;
    /* border: 1px solid black; */

    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: center;
`   

const Subtitle = styled.div`
    width: 30%;
    height: 10%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`
const XOBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const Main = styled.div`
    height: 80%;
    width: 100%; 

    display: flex;
    flex-direction: row;
`

const Panel = styled.div`
    border-right: 1px solid gray;
    height: 100%;
    flex: .7;
    padding-right: 1.5%;
`

const GameBoard = styled.div`
    /* border: 1px solid orange; */
    height: 100%;
    flex: 1.3;

    display: flex;
    flex-direction: column;

    justify-content: center;
    align-items: center;
`

const NewRoom = styled.div`
    width: 50%;
    height: 10%;

    display: flex;
    flex-direction: row;

    justify-content: space-between;
    align-items: flex-end;
`


const SButton = styled(Button)`
    width: 10%;
`

const ChatBox = styled(TextField)`
    width: 85%;
`