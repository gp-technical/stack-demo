import React, { useCallback } from 'react'
import { TextField, Typography, Button, List, ListItemText } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { actionHub, services } from '../../../loader'
import { UserCardAsListItem } from './styles'

const TodoForm = () => {
  const dispatch = useDispatch()
  const { selector } = services.sharedToDo
  const localToDo = useSelector(state => selector.getLocalToDo(state))
  const ownerId = useSelector(state => selector.getOwnerId(state))
  const loggedUsers = useSelector(state => selector.getLoggedUsers(state))

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
            <UserCardAsListItem
              button
              key={userId}
              selected={localToDo.shared.includes(userId)}
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
                      color: 'white',
                      textAlign: 'center'
                    }}
                  >
                    {userId}
                  </Typography>
                }
              />
            </UserCardAsListItem>
          ))}
      </List>
    ),
    [loggedUsers, localToDo]
  )

  return (
    <div>
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
    </div>
  )
}

export default TodoForm
