import React from 'react'
import { Card, CardHeader, CardText } from 'material-ui/Card'
import getColorStyle from './colorPicker'

const style = {
  container: {
    margin: '5px'
  },
  id: {
    padding: '5px'
  },
  message: {
    minWidth: 0, // allows overflowWrap to work in FireFox
    padding: '5px',
    wordBreak: 'break-word',
    overflowWrap: 'break-word'
  }
}

class component extends React.PureComponent {
  render() {
    const { message: { user, message } = {} } = this.props
    const containerStyle = { ...style.container, ...getColorStyle(user) }
    return (
      <Card initiallyExpanded style={containerStyle}>
        <CardHeader title={user} style={style.id} />
        <CardText style={style.message}>{message}</CardText>
      </Card>
    )
  }
}

export default component
