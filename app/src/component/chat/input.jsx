import React from 'react'
import TextField from '@material-ui/core/TextField'

const INITIAL_VALUE = ''
const HINT_TEXT = 'Type message, hit enter to send'

class component extends React.PureComponent {
  state = { value: INITIAL_VALUE }

  handleChange = ({ target: { value } = {} }) => {
    this.setState({ value })
  }

  handleKeyPress = ev => {
    const { onBroadcast } = this.props
    const {
      key,
      target: { value }
    } = ev
    if (key === 'Enter') {
      ev.preventDefault()
      onBroadcast(value)
      this.setState({ value: INITIAL_VALUE })
    }
  }

  render() {
    const { value } = this.state
    return (
      <TextField
        id="chat-input"
        onKeyPress={this.handleKeyPress}
        onChange={this.handleChange}
        placeholder={HINT_TEXT}
        multiline
        value={value}
      />
    )
  }
}

export default component
