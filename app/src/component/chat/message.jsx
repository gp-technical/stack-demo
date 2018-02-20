import React from 'react'
import getColorStyle from './colorPicker'

const style = {
  container: {
    display: 'flex',
    margin: '5px'
  },
  id: {
    padding: '5px',
    whiteSpace: 'nowrap'
  },
  message: {
    minWidth: 0, // allows overflowWrap to work in FireFox
    padding: '5px',
    wordBreak: 'break-word',
    overflowWrap: 'break-word'
  }
}

class component extends React.PureComponent {
  render () {
    const { message: { id, message } = {} } = this.props
    const bgColor = getColorStyle(id)
    const containerStyle = { ...style.container, ...bgColor }
    return (
      <div style={containerStyle}>
        <div style={style.id}>{id}</div>
        <div style={style.message}>{message}</div>
      </div>
    )
  }
}

export default component
