import React from 'react'
import { connect } from 'react-redux'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}
const localData = 'This is the data that has been sourced locally.'

class component extends React.PureComponent {
  onFetchFromLocal = () => {
    this.props.fromLocal(localData)
  }

  onFetchFromApi = () => {
    this.props.fromApi()
  }

  onFetchFromBoth = () => {
    this.props.fromBoth(localData)
  }

  onReload = () => {
    window.location.reload()
  }
  render() {
    var { source, data } = this.props
    return (
      <components.Box>
        <h2>
          Feature: <i>fetch</i>
        </h2>
        <h3>Fetching and Displaying Data</h3>
        <p>Shows the various ways data can make its way to your feature&apos;s REACT component:</p>
        <ul>
          <li>
            <h4>Initialisation Data from the API</h4>
            At application start-up the feature&apos;s state can be initialised from the API. This
            is useful when you want to initialise your component state from a database or from a
            third party source.
          </li>
          <li>
            <h4>Fetched Locally</h4>
            Local data fetched from the browser-side app.
          </li>
          <li>
            <h4>Fetched From the API</h4>
            Remote data fetched from the server-side api as required
          </li>
        </ul>
        <Divider />
        <h3>Data</h3>
        <ul>
          <li>
            <h4>Source</h4>
            {source}
          </li>
          <li>
            <h4>Data</h4>
            {data}
          </li>
        </ul>
        <Divider />
        <Button onClick={this.onFetchFromLocal} style={buttonStyle}>
          Fetch Data Locally
        </Button>
        <Button onClick={this.onFetchFromApi} style={buttonStyle}>
          Fetch Data from the API
        </Button>
        <Button onClick={this.onFetchFromBoth} style={buttonStyle}>
          Fetch Data from Both
        </Button>
        <Button variant="raised" onClick={this.onReload} style={buttonStyle}>
          Restart the App
        </Button>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  source: services.fetch.selector.getSource(state),
  data: services.fetch.selector.getData(state)
})

const mapDispatchToProps = dispatch => ({
  fromLocal: data => dispatch(actionHub.FETCH_FROM_LOCAL(data)),
  fromApi: () => dispatch(actionHub.FETCH_FROM_API()),
  fromBoth: data => dispatch(actionHub.FETCH_FROM_BOTH(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
