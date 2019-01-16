import React from 'react'
import { connect } from 'react-redux'

import { services, components, actionHub } from '../../loader'
import { Button, Typography } from '@material-ui/core'

const style = {
  buttons: {
    margin: 10
  }
}

class Messages extends React.PureComponent {
  handleInfo() {
    this.props.messageInfo()
  }

  handleProgress() {
    this.props.messageProgress()
  }

  handleError() {
    this.props.messageError()
  }

  handleCustom() {
    this.props.messageCustom()
  }

  render() {
    let { apiText, messageText } = this.props
    return (
      <components.Box>
        <h2>
          Feature: <i>Messages</i>
        </h2>
        <p>Sends intermediate messages from the API to the APP.</p>
        <p>Multiple types of messages can be sent: info, progress, error and custom.</p>
        <div>
          <Button
            variant="outlined"
            style={style.buttons}
            onClick={() => {
              this.handleInfo()
            }}
          >
            Info
          </Button>
          <Button
            variant="outlined"
            style={style.buttons}
            onClick={() => {
              this.handleProgress()
            }}
          >
            Progress
          </Button>
          <Button
            variant="outlined"
            style={style.buttons}
            onClick={() => {
              this.handleError()
            }}
          >
            Error
          </Button>
          <Button
            variant="outlined"
            style={style.buttons}
            onClick={() => {
              this.handleCustom()
            }}
          >
            Custom
          </Button>
        </div>
        <div style={{ display: 'inline' }}>
          <div>
            <Typography variant="h5">API Response:</Typography>
            <Typography style={{ margin: 10 }}>{apiText}</Typography>
          </div>
          <div>
            <Typography variant="h5">API Message Response:</Typography>
            <Typography style={{ margin: 10 }}>{messageText}</Typography>
          </div>
        </div>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  apiText: services.messages.selector.getApiData(state),
  messageText: services.messages.selector.getMessageData(state)
})

const mapDispatchToProps = dispatch => ({
  messageInfo: () => dispatch(actionHub.MESSAGES_INFO()),
  messageProgress: () => dispatch(actionHub.MESSAGES_PROGRESS()),
  messageError: () => dispatch(actionHub.MESSAGES_ERROR()),
  messageCustom: () => dispatch(actionHub.MESSAGES_CUSTOM())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Messages)
