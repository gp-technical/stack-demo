import React, { useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { services, actionHub } from '../../../loader'
import {
  Button,
  List,
  ListItem,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Typography
} from '@material-ui/core'
import { Edit } from '@material-ui/icons'
import { UserCard, SharedWithArea, SharedWIthContainer } from './styles'

const MyTodos = () => {
  const dispatch = useDispatch()
  const { selector } = services.sharedToDo
  const todos = useSelector(state => selector.getToDosFromUser(state))
  const onlyMyToDo = useSelector(state => selector.getOnlyMyToDo(state))
  const ownerId = useSelector(state => selector.getOwnerId(state))

  const editToDo = todo => {
    dispatch(actionHub.SHARED_TO_DO_EDIT_TO_DO(todo))
  }

  const openToDoEditDialog = todo => {
    dispatch(actionHub.SHARED_TO_DO_TOGGLE_EDIT_DIALOG())
    dispatch(actionHub.SHARED_TO_DO_SET_EDITED_TO_DO(todo))
  }

  const toggleOnlyMyToDo = () => dispatch(actionHub.SHARED_TO_DO_TOGGLE_ONLY_MY_TO_DO())

  const renderMyToDos = useCallback(
    () => (
      <List>
        {todos
          .filter(todo => {
            if (onlyMyToDo) {
              return todo.ownerId === ownerId
            }
            return todo
          })
          .map((todo, idx) => (
            <ListItem divider key={idx}>
              <ListItemIcon>
                <div>
                  <Checkbox
                    onClick={() => editToDo({ ...todo, done: !todo.done })}
                    checked={todo.done}
                    edge='start'
                  />
                  {todo.ownerId === ownerId ? (
                    <Button onClick={() => openToDoEditDialog(todo)}>
                      <Edit />
                    </Button>
                  ) : null}
                </div>
              </ListItemIcon>
              <ListItemText primary={todo.text} />
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignSelf: 'flex-start'
                }}
              >
                <Typography>Owner</Typography>
                <UserCard selected>
                  <Typography style={{ color: 'white', textAlign: 'center' }}>
                    {todo.ownerId === ownerId ? 'You' : todo.ownerId}
                  </Typography>
                </UserCard>
              </div>
              <SharedWIthContainer>
                <Typography>shared with</Typography>
                <SharedWithArea>
                  {todo.shared.map(userId => (
                    <UserCard key={userId}>
                      <Typography style={{ color: 'white', textAlign: 'center' }}>
                        {userId === ownerId ? 'You' : userId}
                      </Typography>
                    </UserCard>
                  ))}
                </SharedWithArea>
              </SharedWIthContainer>
            </ListItem>
          ))}
      </List>
    ),
    [todos]
  )

  return (
    <div>
      <div>
        <h2>My todos</h2>
        <Button
          variant={onlyMyToDo ? 'outlined' : 'text'}
          onClick={toggleOnlyMyToDo}
          color={onlyMyToDo ? 'primary' : 'default'}
        >
          Only my todo
        </Button>
      </div>
      {renderMyToDos()}
    </div>
  )
}

export default MyTodos
