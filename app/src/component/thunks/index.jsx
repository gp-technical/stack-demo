import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

class component extends React.PureComponent {
  onGetAnswer = () => {
    this.props.getAnswer()
  }

  render () {
    var {answer, isSpinning} = this.props
    if (isSpinning) answer = 'Calculating answer, this will take 3 seconds ...'
    return (
      <components.Box>
        <h2>Feature: <i>thunks</i></h2>
        <h2>Multi-Action Sequences</h2>
        <p>
          Demonstrates how to dispatch multiple REDUX actions from a single Thunk. It also shows that each action can be <i>awaited</i> allowing for the fine, synchronous
          control of an multi-action sequence.
        </p>
        <Divider />
        <h3>Answer To Life, The Universe and Everything</h3>
        <h1>{answer}</h1>
        <Divider />
        <h3>Dispatch a Synchronouse Sequence of REDUX Actions</h3>
        <RaisedButton label='Get The Answer' onClick={this.onGetAnswer} style={buttonStyle} />
      </components.Box>
    )
  }
}

const mapStateToProps = (state) => ({
  answer: services.thunks.selector.getAnswer(state),
  isSpinning: services.spinner.selector.getIsSpinning(state)
})

const mapDispatchToProps = (dispatch) => ({
  getAnswer: () => dispatch(actionHub.THUNKS_GET_ANSWER())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
