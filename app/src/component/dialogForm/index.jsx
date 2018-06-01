import React from 'react'
import { connect } from 'react-redux'
import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import RaisedButton from '@material-ui/core/RaisedButton'
import Dialog from '@material-ui/core/Dialog'
import { actionHub, services, components } from '../../loader'

class dialogForm extends React.PureComponent {
  state = {
    canSubmit: false
  }

  onSubmit = () => {
    this.props.submit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      email: this.state.email
    })
  }
  handleChange = e => {
    const state = {}
    state[e.target.name] = e.target.value
    this.setState(state)
  }

  handleState = e => {
    console.log(this.state)
  }

  enableButton = () => {
    this.setState({
      canSubmit: true
    })
  }

  disableButton = () => {
    this.setState({
      canSubmit: false
    })
  }

  notifyFormError = data => {
    console.error('Form error:', data)
  }

  render() {
    const marginStyle = {
      marginLeft: 12
    }
    const { open, submitted, form, errorMessages } = this.props
    const { wordsError, numericError, emailError } = errorMessages

    const actions = [
      <RaisedButton label="Cancel" onClick={this.props.closeDialog} style={marginStyle} />,
      <RaisedButton
        label="Submit"
        disabled={!this.state.canSubmit}
        primary
        style={marginStyle}
        onClick={this.onSubmit}
      />
    ]
    return (
      <components.Box>
        <h2>
          Feature: <i>Form Dialog</i>
        </h2>
        <h2>Form Dialog with form actions</h2>
        <p>This a form dialog feature that provides form actions such as submit...</p>
        <p>
          Form : {submitted}
          <br />
          Dialog : {open === true ? 'Opened' : 'Closed'}
        </p>
        <p>
          First Name :{open === true ? <i>None</i> : form.firstName}
          <br />
          Last Name : {open === true ? <i>None</i> : form.lastName}
          <br />
          Age : {open === true ? <i>None</i> : form.age} <br />
          Email : {open === true ? <i>None</i> : form.email}
          <br />
        </p>
        <RaisedButton
          label="Open Form Dialog"
          disabled={open}
          primary
          onClick={this.props.openDialog}
        />
        <RaisedButton label="Check State" style={marginStyle} onClick={this.handleState} />
        <Dialog
          title="Form Dialog"
          actions={actions}
          modal={false}
          open={open}
          onRequestClose={this.props.closeDialog}
        >
          <Formsy.Form
            onValid={this.enableButton}
            onInvalid={this.disableButton}
            onValidSubmit={this.onSubmit}
            onInvalidSubmit={this.notifyFormError}
          >
            <h2>The Form</h2>
            <FormsyText
              hintText="First Name"
              floatingLabelText="First Name"
              name="firstName"
              required
              validations="isWords"
              validationError={wordsError}
              onBlur={this.handleChange}
            />
            <br />
            <FormsyText
              hintText="Last Name"
              floatingLabelText="Last Name"
              name="lastName"
              required
              validations="isWords"
              validationError={wordsError}
              onBlur={this.handleChange}
            />
            <br />
            <FormsyText
              hintText="Age"
              floatingLabelText="Age"
              name="age"
              onBlur={this.handleChange}
              required
              validations="isNumeric"
              validationError={numericError}
            />
            <br />
            <FormsyText
              hintText="Email"
              floatingLabelText="Email"
              name="email"
              required
              onBlur={this.handleChange}
              validations="isEmail"
              validationError={emailError}
            />
          </Formsy.Form>
        </Dialog>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  open: services.dialogForm.selector.getOpen(state),
  submitted: services.dialogForm.selector.getSubmitted(state),
  form: services.dialogForm.selector.getForm(state),
  errorMessages: services.dialogForm.selector.getErrorMessages(state)
})

const mapDispatchToProps = dispatch => ({
  openDialog: () => dispatch(actionHub.DIALOG_FORM_OPEN_DIALOG()),
  closeDialog: () => dispatch(actionHub.DIALOG_FORM_CLOSE_DIALOG()),
  delete: () => dispatch(actionHub.DIALOG_FORM_DELETE()),
  submit: data => dispatch(actionHub.DIALOG_FORM_SUBMIT(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(dialogForm)
