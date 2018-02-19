import React from 'react'

class component extends React.PureComponent {
  renderMessages (messages) {
    return messages.map(({ id, message }, index) => (
      <div key={index}>
        {id}: {message}
      </div>
    ))
  }

  render () {
    const { messages } = this.props
    return <div>{messages && this.renderMessages(messages)}</div>
  }
}

export default component
