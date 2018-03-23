import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { actionHub, components, services } from '../../loader'
import { TextField } from 'material-ui'

const component = ({email, isValid, message, sendMail, onChangeMail, validEmail}) => {
  const onChangeEmail = e => {
    onChangeMail(e.target.value)
    validEmail(/\S+@\S+\.\S+/.test(email))
  }

  const onSendMail = () => sendMail(email)

  return (
    <components.Box>
      <div>
        <h2>Feature: <i>Mail</i></h2>
        <h3>Sending test email - using GoodPractice email provider</h3>
        <form>
          <label htmlFor="send" style={{paddingRight: '10px'}}>Send to:</label>
          <TextField type="email" name='send' style={{marginRight: '10px'}} onChange={onChangeEmail}/>
          <RaisedButton label='Send' onClick={onSendMail} disabled={!isValid}/>
        </form>
      </div>
      <div>
        <h1>{message}</h1>
      </div>
    </components.Box>
  )
}

const mapStateToProps = (state) => (
  {
    message: services.mail.selector.getMessage(state),
    email: services.mail.selector.getEmail(state),
    isValid: services.mail.selector.getIsValid(state)
  }
)

const mapDispatchToProps = (dispatch) => ({
  sendMail: (data) => dispatch(actionHub.MAIL_CLIENT(data)),
  onChangeMail: (data) => dispatch(actionHub.MAIL_CHANGE(data)),
  validEmail: (data) => dispatch(actionHub.MAIL_VALIDATE(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
