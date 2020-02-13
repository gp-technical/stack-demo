import React, { useCallback, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Divider,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@material-ui/core'
import { services, components, actionHub } from '../../loader'
import EditDialog from './editDialog'
import { getCookie } from '../../utils'
import WhoAmI from './fragments/whoAmI'
import MyTodos from './fragments/myTodos'

const sharedToDo = () => {
  const dispatch = useDispatch()
  const { selector } = services.sharedToDo
  const localToDo = useSelector(state => selector.getLocalToDo(state))
  const ownerId = useSelector(state => selector.getOwnerId(state))
  const loggedUsers = useSelector(state => selector.getLoggedUsers(state))

  const disconnect = token => dispatch(actionHub.SHARED_TO_DO_REMOVE_FROM_LOGGED_USERS(token))
  const connect = token => dispatch(actionHub.SHARED_TO_DO_ADD_TO_LOGGED_USERS(token))

  const setLocalToDoContent = text =>
    dispatch(actionHub.SHARED_TO_DO_SET_LOCAL_TO_DO({ ...localToDo, text }))

  const setLocalToDoShared = sharedList =>
    dispatch(
      actionHub.SHARED_TO_DO_SET_LOCAL_TO_DO({
        ...localToDo,
        shared: sharedList
      })
    )

  const addToDo = () => {
    dispatch(
      actionHub.SHARED_TO_DO_ADD_TO_DO({
        id: Date.now(),
        ownerId,
        ...localToDo,
        done: false
      })
    )
    dispatch(actionHub.SHARED_TO_DO_SET_LOCAL_TO_DO({ text: '', shared: [] }))
  }

  const renderLoggedUsers = useCallback(
    () => (
      <List style={{ display: 'flex', flexWrap: 'wrap' }}>
        {loggedUsers
          .filter(userId => userId !== ownerId)
          .map(userId => (
            <ListItem
              button
              style={{
                width: '250px',
                background: localToDo.shared.includes(userId) ? '#9b59b6' : 'white',
                margin: '5px',
                borderRadius: '10px',
                border: '1px solid black'
              }}
              key={userId}
              onClick={() =>
                localToDo.shared.includes(userId)
                  ? setLocalToDoShared(localToDo.shared.filter(item => item !== userId))
                  : setLocalToDoShared([...localToDo.shared, userId])
              }
            >
              <ListItemText
                primary={
                  <Typography
                    style={{
                      color: localToDo.shared.includes(userId) ? 'white' : 'black'
                    }}
                  >
                    {userId}
                  </Typography>
                }
              />
            </ListItem>
          ))}
      </List>
    ),
    [loggedUsers, localToDo]
  )

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
      <div>
        <div style={{ width: '300px', margin: '20px' }}>
          <TextField
            placeholder='New todo'
            value={localToDo.text}
            onChange={e => setLocalToDoContent(e.target.value)}
          />
        </div>
        <div>
          <h3>share with</h3>
          {loggedUsers.length !== 1 ? (
            renderLoggedUsers()
          ) : (
            <Typography>No one is online ):</Typography>
          )}
        </div>
      </div>
      <Button variant='outlined' onClick={addToDo}>
        Create to do
      </Button>
    </components.Box>
  )
}

export default sharedToDo
