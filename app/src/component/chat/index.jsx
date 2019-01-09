import React from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import { actionHub, components, services } from '../../loader'
import Input from './input'
import Messages from './messages'

class Chat extends React.PureComponent {
  render() {
    const { messages, handleBroadcast } = this.props
    return (
      <components.Box>
        <h2>
          Feature: <i>chat</i>
        </h2>
        <p>Simple chat functionality</p>
        <Divider />
        <Messages messages={messages} />
        <Input onBroadcast={handleBroadcast} />
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  messages: services.chat.selector.getMessages(state)
})

const mapDispatchToProps = dispatch => ({
  handleBroadcast: content => dispatch(actionHub.CHAT_SEND(content))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat)
