import React from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import RaisedButton from '@material-ui/core/RaisedButton'
import { actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

class component extends React.PureComponent {
  onThrowFromApi = () => {
    this.props.throwFromApi()
  }

  render() {
    var { errorMessage } = this.props
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
          <components.ErrorMsg text={errorMessage} />
        </h3>
        <Divider />
        <RaisedButton
          label="Thrown an API Error"
          onClick={this.onThrowFromApi}
          style={buttonStyle}
        />
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: services.errorMsg.selector.getText(state)
})

const mapDispatchToProps = dispatch => ({
  throwFromApi: () => dispatch(actionHub.ERRORS_THROW_FROM_API())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
