import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionHub, services, components } from '../../loader'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import Game from './game'

export default () => {
  const dispatch = useDispatch()
  const { selector } = services.ticTacToe

  const [disablePlay, setDisablePlay] = useState(false)
  const [XO, setXO] = useState('')

  const userId = useSelector(state => selector.getUserId(state))
  const users = useSelector(state => selector.getUsers(state))
  const isFull = useSelector(state => selector.getFull(state))

  console.log('USERS: ', users)

  useEffect(() => {
    if (users && users.length > 1) {
      const user = users.find(user => user.id === userId)
      setXO(user.XO)
    }
  }, [users])

  const handlePlay = () => {
    dispatch(actionHub.TIC_TAC_TOE_ENTER_GAME({ userId }))
    setDisablePlay(true)
  }

  const Message = () => {
    return (
      <MessageBox>
        <h3> GAME NOT YET INITIALIZED </h3>
        <p> (Click in play and wait for oponent to join) </p>
      </MessageBox>
    )
  }

  return (
    <components.Box>
      <H1> TIC-TAC-TOE </H1>
      <Button onClick={handlePlay} disabled={isFull || disablePlay} color="primary">
        {' '}
        PLAY{' '}
      </Button>
      <Container>{isFull ? <Game isX={XO === 'X'} /> : <Message />}</Container>
      <p> You are: {XO} </p>
    </components.Box>
  )
}

const H1 = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  font-size: 27px;
  font-weight: bold;
`
const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
  height: 35vw;
`
const MessageBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 5vw;

  & h3 {
    font-weight: normal;
    font-size: 1.8vw;
    margin: 0;
  }
  & p {
    margin: 0;
    font-size: 1.2vw;
  }
`
