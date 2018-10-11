import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
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

class Message extends React.PureComponent {
  render() {
    const { message: { user, message } = {} } = this.props
    const containerStyle = { ...style.container, ...getColorStyle(user) }
    return (
      <Card style={containerStyle}>
        <Typography variant="subtitle1" style={style.id}>
          {user}
        </Typography>
        <CardContent style={style.message}>{message}</CardContent>
      </Card>
    )
  }
}

export default Message
