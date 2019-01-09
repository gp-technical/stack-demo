import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogActions from '@material-ui/core/DialogActions'
import { actionHub, services, components } from '../../loader'

class DialogSimple extends React.PureComponent {
  render() {
    const { open, answer, closeDialog, submit, openDialog, delete: fireDelete } = this.props
    const actions = (
      <DialogActions>
        <Button variant="contained" onClick={closeDialog}>
          Cancel
        </Button>
        ,
        <Button variant="contained" color="secondary" onClick={fireDelete}>
          Delete
        </Button>
        ,
        <Button variant="contained" color="primary" onClick={submit}>
          Submit
        </Button>
      </DialogActions>
    )

    return (
      <components.Box>
        <h2>
          Feature: <i>Simple Dialog</i>
        </h2>
        <h2>Simple Dialog with straightforward actions</h2>
        <p>
          This a simple dialog feature that provides straightforward actions such as submit or
          delete....
        </p>
        <p>
          Data : {answer}
          <br />
          Dialog : {open === true ? 'Opened' : 'Closed'}
        </p>
        <Button variant="contained" color="primary" onClick={openDialog}>
          Open Dialog
        </Button>
        <Dialog open={open} onClose={closeDialog} disableBackdropClick>
          <DialogTitle>Dialog With Straightforward Actions</DialogTitle>
          <DialogContent>
            <DialogContentText>Hello World</DialogContentText>
            {actions}
          </DialogContent>
        </Dialog>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  open: services.dialogSimple.selector.getOpen(state),
  answer: services.dialogSimple.selector.getAnswer(state)
})

const mapDispatchToProps = dispatch => ({
  openDialog: () => dispatch(actionHub.DIALOG_SIMPLE_OPEN_DIALOG()),
  closeDialog: () => dispatch(actionHub.DIALOG_SIMPLE_CLOSE_DIALOG()),
  delete: () => dispatch(actionHub.DIALOG_SIMPLE_DELETE()),
  submit: () => dispatch(actionHub.DIALOG_SIMPLE_SUBMIT())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DialogSimple)
