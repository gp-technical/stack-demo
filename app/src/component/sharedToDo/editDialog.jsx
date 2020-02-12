import React, { useCallback } from 'react'
import {
  Dialog,
  ListItem,
  List,
  ListItemText,
  Typography,
  TextField,
  Button
} from '@material-ui/core'
import { useSelector, useDispatch } from 'react-redux'
import { services, actionHub } from '../../loader'

const EditDialog = () => {
  const dispatch = useDispatch()
  const { selector } = services.sharedToDo
  const ownerId = useSelector(state => selector.getOwnerId(state))
  const loggedUsers = useSelector(state => selector.getLoggedUsers(state))
  const editedToDo = useSelector(state => selector.getEditedToDo(state))
  const editedToDoDialogOpen = useSelector(state => selector.getEditedToDoDialogOpen(state))

  const setEditedToDoContent = text =>
    dispatch(actionHub.SHARED_TO_DO_SET_EDITED_TO_DO({ ...editedToDo, text }))

  const setEditedToDoShared = sharedList =>
    dispatch(actionHub.SHARED_TO_DO_SET_EDITED_TO_DO({ ...editedToDo, shared: sharedList }))

  const closeToDoEditDialog = todo => {
    dispatch(actionHub.SHARED_TO_DO_TOGGLE_EDIT_DIALOG())
  }

  const editToDo = () => {
    dispatch(actionHub.SHARED_TO_DO_EDIT_TO_DO(editedToDo))
    dispatch(actionHub.SHARED_TO_DO_TOGGLE_EDIT_DIALOG())
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
                background: editedToDo.shared.includes(userId) ? '#9b59b6' : 'white',
                margin: '5px',
                borderRadius: '10px',
                border: '1px solid black'
              }}
              key={userId}
              onClick={() =>
                editedToDo.shared.includes(userId)
                  ? setEditedToDoShared(editedToDo.shared.filter(item => item !== userId))
                  : setEditedToDoShared([...editedToDo.shared, userId])
              }
            >
              <ListItemText
                primary={
                  <Typography
                    style={{ color: editedToDo.shared.includes(userId) ? 'white' : 'black' }}
                  >
                    {userId}
                  </Typography>
                }
              />
            </ListItem>
          ))}
      </List>
    ),
    [loggedUsers, editedToDo]
  )

  return (
    <Dialog onClose={closeToDoEditDialog} open={editedToDoDialogOpen}>
      <div style={{ padding: '30px' }}>
        <TextField
          placeholder='Edit todo'
          value={editedToDo.text}
          onChange={e => setEditedToDoContent(e.target.value)}
        />
        {loggedUsers.length !== 1 ? (
          renderLoggedUsers()
        ) : (
          <Typography>No one is online ):</Typography>
        )}
        <Button variant='outlined' onClick={editToDo}>
          Edit
        </Button>
      </div>
    </Dialog>
  )
}

export default EditDialog
