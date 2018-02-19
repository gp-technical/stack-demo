import React from 'react'
import TextField from 'material-ui/TextField'

const initialValue = ''

class component extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      value: initialValue
    }
  }

  handleChange = ({ target: { value } = {} }) => {
    this.setState({ value })
  }

  handleKeyPress = ev => {
    const { onBroadcast } = this.props
    const { key, target: { value } } = ev
    if (key === 'Enter') {
      ev.preventDefault()
      console.log('Got an enter - broadcasting: ' + value)
      onBroadcast(value)
      this.setState({ value: initialValue })
    }
  }

  render () {
    const { value } = this.state
    return (
      <TextField
        id="chat-input"
        onKeyPress={this.handleKeyPress}
        onChange={this.handleChange}
        hintText="Enter message, return to send"
        value={value}
      />
    )
  }
}

export default component
