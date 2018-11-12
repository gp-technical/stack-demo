import React from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { actions, actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

class component extends React.PureComponent {
  fireClearError = () => {
    this.props.clearError()
  }

  fireThrowFromApi = () => {
    this.props.throwFromApi()
  }

  render() {
    var { actionType, errorMessage } = this.props
    return (
      <components.Box>
        <h2>
          Feature: <i>errors</i>
        </h2>
        <h3>Displaying Errors From the API</h3>
        <p>
          Highlights how to display errors thrown on the API. For security reason the error details
          from the API are logged via Watson with only a bland error message being returned for
          display.
        </p>
        <p>
          If you are running this locally you can see the full server error in your command window.
          Otherwise it can be found in the LogEntries website.
        </p>
        <Divider />
        <h3>
          <components.ErrorMsg msg={errorMessage} actionType={actionType} />
        </h3>
        <Divider />

        <Button onClick={this.fireThrowFromApi} style={buttonStyle}>
          Thrown an API Error
        </Button>
        <Button onClick={this.fireClearError} style={buttonStyle}>
          Clear error
        </Button>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: services.errorMsg.selector.getMsg(state),
  actionType: services.errorMsg.selector.getActionType(state)
})

const mapDispatchToProps = dispatch => ({
  throwFromApi: () => dispatch(actionHub.ERRORS_THROW_FROM_API()),
  clearError: () => dispatch(actions.clearError())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
