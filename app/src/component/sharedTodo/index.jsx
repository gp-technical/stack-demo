import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Divider, Button } from '@material-ui/core'
import { services, components, actionHub } from '../../loader'

const sharedTodo = () => {
  const dispatch = useDispatch()
  const { selector } = services.sharedToDo
  const todos = useSelector(state => selector.getTodosFromUser(state))
  const ownerId = useSelector(state => selector.getOwnerId(state))

  const addToDo = () =>
    dispatch(
      actionHub.SHARED_TO_DO_ADD_TODO({
        id: 1,
        ownerId,
        text: 'hi how are you',
        done: false,
        shared: []
      })
    )

  console.log(todos)
  console.log(ownerId)
  return (
    <components.Box>
      <h2>Shared to do</h2>
      <p>hi</p>
      <Divider />
      <h3>Answer To Life, The Universe and Everything</h3>
      <Divider />
      <Button onClick={addToDo}>Test</Button>
    </components.Box>
  )
}

export default sharedTodo
