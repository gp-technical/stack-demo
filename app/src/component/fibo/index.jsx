import React from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

class component extends React.PureComponent {
  url = path => {
    return `${this.props.api.url}/fibo/${path}`
  }
  onNextRedux = () => {
    this.props.next()
  }
  onBigNumberRedux = () => {
    this.props.bigNumber()
  }
  render() {
    var { sequence } = this.props

    return (
      <components.Box>
        <h2>
          Feature: <i>fibo</i>
        </h2>
        <h3>Intense CPU tasks</h3>
        <p>Demonstrates how the stack behaves under heavy CPU tasks.</p>
        <Divider />
        <h1>Sequence = {sequence}</h1>
        <Divider />
        <h3>Dispatch REDUX Actions</h3>
        <Button variant="contained" onClick={this.onNextRedux} style={buttonStyle}>
          Next Sequence
        </Button>
        <Button variant="contained" onClick={this.onBigNumberRedux} style={buttonStyle}>
          Big Sequence (40 numbers)
        </Button>
        <Divider />
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  sequence: services.fibo.selector.getSequence(state),
  api: services.api.selector.getApi(state)
})

const mapDispatchToProps = dispatch => ({
  next: () => dispatch(actionHub.FIBO_NEXT()),
  bigNumber: () => dispatch(actionHub.FIBO_BIG_NUMBER())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
