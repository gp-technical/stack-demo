import React from 'react'

const style = {
  container: {
    display: 'flex',
    width: '90%'
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
    return (
      <div style={style.container}>
        <div style={style.id}>{id}</div>
        <div style={style.message}>{message}</div>
      </div>
    )
  }
}

export default component
