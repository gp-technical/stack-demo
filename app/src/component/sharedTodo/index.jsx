import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Divider,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon,
  Typography
} from '@material-ui/core'
import { services, components, actionHub } from '../../loader'

const sharedTodo = () => {
  const dispatch = useDispatch()
  const { selector } = services.sharedToDo
  const todos = useSelector(state => selector.getTodosFromUser(state))
  const localToDo = useSelector(state => selector.getLocalToDo(state))
  const ownerId = useSelector(state => selector.getOwnerId(state))
  const loggedUsers = useSelector(state => selector.getLoggedUsers(state))

  const setLocalToDoContent = text =>
    dispatch(actionHub.SHARED_TO_DO_SET_LOCAL_TO_DO({ ...localToDo, text }))

  const setLocalToDoShared = sharedList =>
    dispatch(actionHub.SHARED_TO_DO_SET_LOCAL_TO_DO({ ...localToDo, shared: sharedList }))

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

  const editToDo = todo => {
    dispatch(actionHub.SHARED_TO_DO_EDIT_TO_DO(todo))
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
                    style={{ color: localToDo.shared.includes(userId) ? 'white' : 'black' }}
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

  const renderMyTodos = useCallback(
    () => (
      <List>
        {todos.map((todo, idx) => (
          <ListItem
            button
            onClick={() => editToDo({ ...todo, done: !todo.done })}
            divider
            key={idx}
          >
            <ListItemIcon>
              <Checkbox checked={todo.done} edge='start' />
            </ListItemIcon>
            <ListItemText primary={todo.text} />
            <div style={{ display: 'flex', flexDirection: 'column', width: '50%' }}>
              <Typography>shared with</Typography>
              <div
                style={{
                  display: 'flex',
                  flexFlow: 'column wrap',
                  width: '100%',
                  height: '121px',
                  overflowX: 'auto'
                }}
              >
                {todo.shared.map(userId => (
                  <div
                    key={userId}
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: '250px',
                      height: '43px',
                      background: '#2980b9',
                      borderRadius: '10px',
                      margin: '5px'
                    }}
                  >
                    <Typography style={{ color: 'white' }}>{userId}</Typography>
                  </div>
                ))}
              </div>
            </div>
          </ListItem>
        ))}
      </List>
    ),
    [todos]
  )

  console.log(todos)

  return (
    <components.Box>
      <h2>Shared todo</h2>
      <div>
        <h3>Who am i?</h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '250px',
            height: '43px',
            background: '#2980b9',
            borderRadius: '10px'
          }}
        >
          <Typography style={{ color: 'white' }}>{ownerId}</Typography>
        </div>
      </div>
      <Divider />
      <h2>My todos</h2>
      {renderMyTodos()}
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

export default sharedTodo
