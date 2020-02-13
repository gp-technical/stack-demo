import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { actionHub, services, components } from '../../loader'
import styled from 'styled-components'


const localData = 'Essa veio localmente.'

export default () =>
{
    const dispatch = useDispatch()
    const [textValue, setTextValue] = useState('')

    const { selector } = services.ticTacToe

    const data = useSelector(state => selector.getData(state))
    const myId = useSelector(state => selector.getId(state))
    // const topics = Object.keys(data)
    console.log('DATA:', data)



    const onFetchFromApi = () => dispatch(actionHub.TIC_TAC_TOE_FROM_API())



    return (
        <components.Box>
            <Wrapper>

                <h3> TIC TAC TOE </h3>
                <p> User: {myId}</p>

                <Main>

                    <Panel>
                        <List>
                            {
                                ['sala1','sala2', 'sala3'].map(topic => 

                                    <ListItem 
                                        key={topic} 
                                        button
                                        onClick={e => setActiveTopic(e.target.innerText)}
                                    >
                                        <ListItemText primary={topic} />
                                    </ListItem>
                                    
                                )
                            }
                        </List>
                    </Panel>

                    <Game>

                    </Game>

                </Main>

                <NewRoom>
                    <ChatBox 
                        id='standard-basic' 
                        label='Create a room' 
                        value={textValue}
                        onChange={e => setTextValue(e.target.value)}
                    />

                    <SButton 
                        variant='contained' 
                        color='primary'
                        onClick={() => 
                            {
                                // sendChatAction({ from: user, msg: textValue, topic: activeTopic })
                                onFetchFromApi()
                                setTextValue('')
                            }
                        }
                    >
                        Send
                    </SButton>
                </NewRoom>

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

const Game = styled.div`
    /* border: 1px solid black; */
    height: 100%;
    flex: 1.3;
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