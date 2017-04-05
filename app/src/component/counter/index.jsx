import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { env, actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

const url = (path) => {
  return `${env.apiUrl}/rest/counter/${path}`
}

class component extends React.PureComponent {
  onIncrementRedux = () => {
    this.props.increment()
  }
  onDecrementRedux = () => {
    this.props.decrement()
  }
  onGetTotalRedux = () => {
    this.props.getTotal()
  }
  onIncrementRest = () => {
    window.open(url('increment'), '_blank')
  }
  onDecrementRest = () => {
    window.open(url('decrement'), '_blank')
  }
  onGetTotalRest = () => {
    window.open(url('total'), '_blank')
  }
  render () {
    var {total} = this.props

    return (
      <components.Box>
        <h2>Feature: <i>counter</i></h2>
        <h3>Working with an API Service</h3>
        <p>
          Demonstrates how to update your local state by dispatching REDUX actions that are processed by the API.
        </p>
        <p>
          It also shows how to expose selected aspects of the API service though REST endpoints.
        </p>
        <Divider />
        <h1>Total = {total}</h1>
        <Divider />
        <h3>Dispatch REDUX Actions</h3>
        <RaisedButton label='Increment ++' onClick={this.onIncrementRedux} style={buttonStyle} />
        <RaisedButton label='Decrement --' onClick={this.onDecrementRedux} style={buttonStyle} />
        <RaisedButton label='Get Total' onClick={this.onGetTotalRedux} style={buttonStyle} />
        <Divider />
        <h3>Access the Equivalent REST Endpoints</h3>
        <ul>
          <li>
            <a href='#' onClick={this.onIncrementRest}>Increment</a>
          </li>
          <li>
            <a href='#' onClick={this.onDecrementRest}>Decrement</a>
          </li>
          <li>
            <a href='#' onClick={this.onGetTotalRest}>Get Total</a>
          </li>
        </ul>
      </components.Box>
    )
  }
}

const mapStateToProps = (state) => ({
  total: services.counter.selector.getTotal(state)
})

const mapDispatchToProps = (dispatch) => ({
  getTotal: () => dispatch(actionHub.COUNTER_GET_TOTAL()),
  increment: () => dispatch(actionHub.COUNTER_INCREMENT()),
  decrement: () => dispatch(actionHub.COUNTER_DECREMENT())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
