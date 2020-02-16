import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { actionHub, services, components } from '../../loader'
import Button from '@material-ui/core/Button'
import styled from 'styled-components'
import Game from './game'
import { direction, alignment, px, font } from './styles'

export default () => {
  const dispatch = useDispatch()
  const { selector } = services.ticTacToe

  const [disablePlay, setDisablePlay] = useState(false)
  const [XO, setXO] = useState('')

  const userId = useSelector(state => selector.getUserId(state))
  const users = useSelector(state => selector.getUsers(state))
  const isFull = useSelector(state => selector.getFull(state))
  const reenablePlay = useSelector(state => selector.getReenablePlay(state))

  useEffect(() => {
    if (users && users.length > 1) {
      const user = users.find(user => user.id === userId)
      setXO(user.XO)
    }
  }, [users])

  useEffect(() => {
    reenablePlay && setXO('')
    setDisablePlay(false)
  }, [reenablePlay])

  const handlePlay = () => {
    dispatch(actionHub.TIC_TAC_TOE_ENTER_GAME({ userId }))
    dispatch(actionHub.TIC_TAC_TOE_RESET_PLAY())
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
      <Button onClick={handlePlay} disabled={!reenablePlay && disablePlay} color="primary">
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
  ${direction()};
  ${alignment()};
  ${font({ size: 30, weight: 'bold' })};
`
const Container = styled.div`
  ${direction()};
  ${alignment()};
  width: 100%;
  height: ${px(450)};
`
const MessageBox = styled.div`
  ${direction('column')};
  ${alignment({ main: 'space-between' })};
  height: ${px(65)};
  & h3 {
    ${font({ size: 27 })};
    margin: 0;
  }
  & p {
    ${font()};
    margin: 0;
  }
`
