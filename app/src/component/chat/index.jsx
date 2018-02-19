import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import { actionHub, components, services } from '../../loader'
import Input from './input'
import Messages from './messages'

class component extends React.PureComponent {
  render () {
    const { id, messages, handleBroadcast } = this.props
    return (
      <components.Box>
        <h2>
          Feature: <i>chat</i>
        </h2>
        <p>Simple chat functionality</p>
        <Divider />
        <div>{id}</div>
        <Messages messages={messages} />
        <Input onBroadcast={handleBroadcast} />
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  id: services.chat.selector.getId(state),
  messages: services.chat.selector.getMessages(state)
})

const mapDispatchToProps = dispatch => ({
  handleBroadcast: content => dispatch(actionHub.CHAT_BROADCAST(content))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
