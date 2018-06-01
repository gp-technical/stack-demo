import React from 'react'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import { actionHub, services, components } from '../../loader'

class dialogSimple extends React.PureComponent {
  render() {
    const marginStyle = {
      marginLeft: 12
    }
    const { open, answer, closeDialog, submit, openDialog } = this.props
    const actions = [
      <Button variant="raised" onClick={closeDialog} style={marginStyle}>
        Cancel
      </Button>,
      <Button variant="raised" secondary style={marginStyle} onClick={this.props.delete}>
        Delete
      </Button>,
      <Button variant="raised" primary style={marginStyle} onClick={submit}>
        Submit
      </Button>
    ]

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
        <Button variant="raised" primary onClick={openDialog}>
          Open Dialog
        </Button>
        <Dialog
          title="Dialog With Straightforward Actions"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={closeDialog}
        >
          <h1>Hello World</h1>
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
)(dialogSimple)
