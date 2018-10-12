import React, { PureComponent } from 'react'
import Button from '@material-ui/core/Button'

const style = {
  marginLeft: 20
}

class Buggy extends PureComponent {
  state = { count: 0 }

  handleClick = () => this.setState(({ count }) => ({ count: count + 1 }))

  render() {
    const { count } = this.state
    if (count === 5) {
      throw new Error('Ooops - count hit 5')
    }
    return (
      <div>
        Count is currently: {count}
        <Button variant="outlined" onClick={this.handleClick} style={style}>
          Increment
        </Button>
      </div>
    )
  }
}

export default Buggy
