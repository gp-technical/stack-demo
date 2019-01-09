import React from 'react'
import Message from './message'

class Messages extends React.PureComponent {
  renderMessages(messages = []) {
    return messages.map((message, index) => <Message message={message} key={index} />)
  }

  render() {
    const { messages } = this.props
    return <div>{messages && this.renderMessages(messages)}</div>
  }
}

export default Messages
