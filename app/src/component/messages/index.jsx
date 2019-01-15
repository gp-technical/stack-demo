import React from 'react'
import { connect } from 'react-redux'

import { services, components, actionHub } from '../../loader'
import { Button, Typography } from '@material-ui/core'

const style = {
  btnInfo: {
    backgroundColor: 'lightblue'
  },
  btnProgress: {
    backgroundColor: 'lightgreen'
  },
  btnError: {
    backgroundColor: 'red'
  },
  btnCustom: {
    backgroundColor: 'yellow'
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
        <div>
          <Button
            style={style.btnInfo}
            onClick={() => {
              this.handleInfo()
            }}
          >
            Info
          </Button>
          <Button
            style={style.btnProgress}
            onClick={() => {
              this.handleProgress()
            }}
          >
            Progress
          </Button>
          <Button
            style={style.btnError}
            onClick={() => {
              this.handleError()
            }}
          >
            Error
          </Button>
          <Button
            style={style.btnCustom}
            onClick={() => {
              this.handleCustom()
            }}
          >
            Custom
          </Button>
        </div>
        <Typography variant="h5">API Response:</Typography>
        <Typography>{apiText}</Typography>
        <Typography variant="h5">API Message Response:</Typography>
        <Typography>{messageText}</Typography>
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
