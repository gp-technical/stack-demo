import React from 'react'
import { connect } from 'react-redux'
import { actionHub, services, components, helper } from '../../loader'
import TextField from '@material-ui/core/TextField'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import IconButton from '@material-ui/core/IconButton'
import Dialog from '@material-ui/core/Dialog'
import Create from '@material-ui/icons/Create'
import Delete from '@material-ui/icons/Delete'

const fieldStyle = {
  margin: 12
}

class component extends React.PureComponent {
  state = {
    create: '',
    openModal: false,
    edit: '',
    editId: -1
  }

  onAdd = e => {
    const { createTodo } = this.props
    const { create } = this.state
    createTodo(create)
  }

  onDelete = e => {
    const id = helper.dom.findDataSetValue(e.target, 'id')
    const { deleteTodo } = this.props
    deleteTodo(id)
  }

  onEdit = () => {
    const { updateTodo } = this.props
    const { edit, editId } = this.state
    updateTodo(editId, edit)
    this.handleClose()
  }

  handleChange = e => {
    const status = helper.dom.findDataSetValue(e.target, 'status')
    const value = e.target.value
    this.setState({ [status]: value })
  }

  handleOpen = e => {
    const id = helper.dom.findDataSetValue(e.target, 'id')
    const { todos } = this.props
    this.setState({ openModal: true, editId: id, edit: todos[id] })
  }

  handleClose = () => {
    this.setState({ openModal: false })
  }

  renderIcons = id => {
    return (
      <div style={{ height: '100%', margin: '0 12px', width: 'initial' }}>
        <IconButton data-id={id} tooltip="edit" onClick={this.handleOpen}>
          <Create />
        </IconButton>
        <IconButton data-id={id} tooltip="delete" onClick={this.onDelete}>
          <Delete />
        </IconButton>
      </div>
    )
  }

  render() {
    const { create, edit, openModal } = this.state
    const { todos } = this.props

    const actions = [
      <Button primary onClick={this.handleClose}>
        Cancel
      </Button>
    ]

    return (
      <components.Box>
        <h2>
          Feature: <i>Todos</i>
        </h2>
        <h3>Working with an API Service</h3>
        <p>add/edit/delete todo by dispatching REDUX actions that are processed by the API.</p>
        <Divider />
        <div>
          <TextField
            name="createValue"
            style={fieldStyle}
            value={create}
            data-status="create"
            onChange={this.handleChange}
          />
          <Button variant="raised" onClick={this.onAdd}>
            Add
          </Button>
        </div>
        {todos &&
          todos.length > 0 && (
            <List>
              {todos.map((todo, index) => (
                <ListItem key={index}>
                  <ListItemText>{todo}</ListItemText>
                  {this.renderIcons(index)}
                </ListItem>
              ))}
            </List>
          )}
        <Dialog
          title="Edit Todo"
          actions={actions}
          modal={false}
          open={openModal}
          onRequestClose={this.handleClose}
        >
          <TextField
            name="editValue"
            style={fieldStyle}
            value={edit}
            data-status="edit"
            onChange={this.handleChange}
          />
          <Button variant="raised" onClick={this.onEdit}>
            Update
          </Button>
        </Dialog>
      </components.Box>
    )
  }
}
const mapStateToProps = state => ({
  todos: services.todos.selector.getTodos(state)
})

const mapDispatchToProps = dispatch => ({
  createTodo: todo => dispatch(actionHub.TODOS_CREATE({ value: todo })),
  updateTodo: (index, todo) => dispatch(actionHub.TODOS_UPDATE({ id: index, value: todo })),
  deleteTodo: index => dispatch(actionHub.TODOS_DELETE({ id: index }))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
