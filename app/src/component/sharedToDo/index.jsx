import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Divider } from '@material-ui/core'
import { components, actionHub } from '../../loader'
import EditDialog from './editDialog'
import { getCookie } from '../../utils'
import WhoAmI from './fragments/whoAmI'
import MyTodos from './fragments/myTodos'
import TodoForm from './fragments/todoForm'

const sharedToDo = () => {
  const dispatch = useDispatch()

  const disconnect = token => dispatch(actionHub.SHARED_TO_DO_REMOVE_FROM_LOGGED_USERS(token))
  const connect = token => dispatch(actionHub.SHARED_TO_DO_ADD_TO_LOGGED_USERS(token))

  useEffect(() => {
    const interval = setInterval(() => {
      const token = getCookie('sharedToDoUuid')
      if (token.length) {
        connect(token)
        clearInterval(interval)
      }
    }, 500)

    window.addEventListener('beforeunload', () => {
      const token = getCookie('sharedToDoUuid')
      disconnect(token)
    })
  }, [])

  return (
    <components.Box>
      <EditDialog />
      <h2>Shared todo</h2>
      <WhoAmI />
      <Divider />
      <MyTodos />
      <Divider />
      <TodoForm />
    </components.Box>
  )
}

export default sharedToDo
