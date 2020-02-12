import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Divider, Button, TextField } from '@material-ui/core'
import { services, components, actionHub } from '../../loader'

const sharedTodo = () => {
  const dispatch = useDispatch()
  const { selector } = services.sharedToDo
  // const todos = useSelector(state => selector.getTodosFromUser(state))
  const ownerId = useSelector(state => selector.getOwnerId(state))
  const [shareTo, setShareTo] = useState('')

  const addToDo = () =>
    dispatch(
      actionHub.SHARED_TO_DO_ADD_TO_DO({
        id: 1,
        ownerId,
        text: 'hi how are you',
        done: false,
        shared: [shareTo]
      })
    )

  return (
    <components.Box>
      <h2>Shared to do</h2>
      <p>hi</p>
      <Divider />
      <h3>Answer To Life, The Universe and Everything</h3>
      <Divider />
      <TextField placeholder='share to' onChange={e => setShareTo(e.target.value)} />
      <Button onClick={addToDo}>Test</Button>
    </components.Box>
  )
}

export default sharedTodo
