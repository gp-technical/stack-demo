import React from 'react'
import { connect } from 'react-redux'

import { services, components, actionHub } from '../../loader'
import { Button, Typography } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import LinearProgress from '@material-ui/core/LinearProgress'

const style = {
  buttons: {
    margin: 10
  },
  info: {
    margin: 10,
    backgroundColor: '#A098D9',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    color: 'white'
  },
  error: {
    margin: 10,
    backgroundColor: '#FF4747',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    color: 'white'
  },
  custom: {
    margin: 10,
    backgroundColor: '#FFE86F',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    color: 'white'
  },
  root: {
    flexGrow: 1
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
    let { result, message } = this.props
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
          {result &&  (
            <div>
              <Typography variant="h6">API Response:</Typography>
              <Typography style={{ margin: 10 }}>{result}</Typography>
            </div>
          )}
          {message && message.type && message.type === 'info' && (
            <Chip label={message.text} style={style.info} />
          )}
          {message && message.type && message.type === 'progress' && (
            <div style={style.root}>
              <LinearProgress variant="determinate" value={message.progress} />
            </div>
          )}
          {message && message.type && message.type === 'error' && (
            <Chip label={message.text} style={style.error} />
          )}
          {message && message.type && message.type === 'custom' && (
            <Chip label={message.text} style={style.custom} />
          )}
        </div>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  result: services.messages.selector.getApiData(state),
  message: services.messages.selector.getMessageData(state)
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
