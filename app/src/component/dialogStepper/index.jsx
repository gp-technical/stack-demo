import React from 'react'
import { connect } from 'react-redux'
import Formsy from 'formsy-react'
import FormsyText from 'formsy-material-ui/lib/FormsyText'
import FormsyCheckbox from 'formsy-material-ui/lib/FormsyCheckbox'
import FormsyRadioGroup from 'formsy-material-ui/lib/FormsyRadioGroup'
import FormsyRadio from 'formsy-material-ui/lib/FormsyRadio'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import RaisedButton from 'material-ui/RaisedButton'
import Dialog from 'material-ui/Dialog'
import { services, actionHub, components } from '../../loader'

class dialogStepper extends React.PureComponent {
  state = {
    canSubmit: false
  }

  handleState = () => {
    console.log('Stepper data', this.props.stepperInput)
  }

  handleChange = e => {
    if (e.target.name === 'firstName') {
      this.setState({ firstName: e.target.value })
    } else if (e.target.name === 'lastName') {
      this.setState({ lastName: e.target.value })
    } else if (e.target.name === 'age') {
      this.setState({ age: e.target.value })
    } else if (e.target.name === 'email') {
      this.setState({ email: e.target.value })
    } else if (e.target.name === 'sex') {
      this.setState({ sex: e.target.value })
    } else if (e.target.name === 'employed') {
      if (!e.target.value) {
        this.setState({ employed: 'No' })
      } else {
        this.setState({ employed: 'Yes' })
      }
    }
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

  submitStepper = () => {
    this.props.submit({
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      age: this.state.age,
      email: this.state.email,
      sex: this.state.sex,
      employed: this.state.employed
    })
  }

  notifyFormError = data => {
    console.error('Form error:', data)
  }

  render () {
    const {
      isStepOpen,
      stepIndex,
      errorMessages,
      submitted,
      stepperInput
    } = this.props
    const { wordsError, numericError, emailError } = errorMessages
    const marginStyle = {
      marginRight: 12
    }
    const actions = [
      <RaisedButton
        label="Cancel"
        onClick={this.props.close}
        style={marginStyle}
      />,
      <RaisedButton
        label="Back"
        disabled={stepIndex === 0}
        style={marginStyle}
        primary={true}
        onClick={this.props.previous}
      />,
      <RaisedButton
        label={stepIndex === 2 ? 'Submit' : 'Next'}
        style={marginStyle}
        primary={true}
        onClick={stepIndex === 2 ? this.submitStepper : this.props.next}
      />
    ]

    return (
      <components.Box>
        <h2>
          Feature: <i>Stepper Dialog</i>
        </h2>
        <h2>The Stepper dialog with different actions</h2>
        <p>
          This is a wizard dialogs with stepper actions such as next, previous,
          submit...
        </p>
        <p>
          Wizard: {submitted}
          <br />
          Dialog: {isStepOpen === true ? 'Opened' : 'Closed'} <br />
        </p>
        <p>
          First Name:
          {isStepOpen === true ? <i>None</i> : stepperInput.firstName}
          <br />
          Last Name: {isStepOpen === true ? <i>None</i> : stepperInput.lastName}
          <br />
          Age: {isStepOpen === true ? <i>None</i> : stepperInput.age}
          <br />
          Email: {isStepOpen === true ? <i>None</i> : stepperInput.email}
          <br />
          Sex: {isStepOpen === true ? <i>None</i> : stepperInput.sex}
          <br />
          Employed: {isStepOpen === true ? <i>None</i> : stepperInput.employed}
          <br />
        </p>
        <RaisedButton
          label="Open Stepper Dialog"
          primary={true}
          onClick={this.props.open}
          style={marginStyle}
        />
        <RaisedButton label="Check State" onClick={this.handleState} />
        <Dialog
          title="Stepper Dialog"
          modal={false}
          actions={actions}
          open={isStepOpen}
          onRequestClose={this.props.close}
        >
          <div>
            <Formsy.Form
              onValid={this.enableButton}
              onInvalid={this.disableButton}
              onValidSubmit={this.submitStepper}
              onInvalidSubmit={this.notifyFormError}
            >
              <Stepper activeStep={stepIndex} orientation="vertical">
                <Step>
                  <StepLabel>Step 1</StepLabel>
                  <StepContent>
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
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>Step 2</StepLabel>
                  <StepContent>
                    <FormsyText
                      hintText="Age"
                      floatingLabelText="Age"
                      name="age"
                      required
                      validations="isNumeric"
                      validationError={numericError}
                      onBlur={this.handleChange}
                    />
                    <br />
                    <FormsyText
                      hintText="Email"
                      floatingLabelText="Email"
                      name="email"
                      required
                      validations="isEmail"
                      validationError={emailError}
                      onBlur={this.handleChange}
                    />
                  </StepContent>
                </Step>
                <Step>
                  <StepLabel>Step 3</StepLabel>
                  <StepContent>
                    <FormsyRadioGroup
                      name="sex"
                      onChange={this.handleChange}
                      required
                    >
                      <FormsyRadio value="Male" label="Male" />
                      <FormsyRadio value="Female" label="Female" />
                    </FormsyRadioGroup>
                    <br />
                    <FormsyCheckbox
                      name="employed"
                      label="Are you Employed?"
                      required
                      onChange={this.handleChange}
                    />
                  </StepContent>
                </Step>
              </Stepper>
            </Formsy.Form>
          </div>
        </Dialog>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  isStepOpen: services.dialogStepper.selector.getStepOpen(state),
  stepIndex: services.dialogStepper.selector.getStepIndex(state),
  submitted: services.dialogStepper.selector.getSubmitted(state),
  errorMessages: services.dialogStepper.selector.getErrorMessages(state),
  stepperInput: services.dialogStepper.selector.getStepperInput(state)
})

const mapDispatchToProps = dispatch => ({
  open: () => dispatch(actionHub.DIALOG_STEPPER_OPEN()),
  close: () => dispatch(actionHub.DIALOG_STEPPER_CLOSE()),
  next: () => dispatch(actionHub.DIALOG_STEPPER_NEXT()),
  previous: () => dispatch(actionHub.DIALOG_STEPPER_PREVIOUS()),
  submit: data => dispatch(actionHub.DIALOG_STEPPER_SUBMIT(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(dialogStepper)
