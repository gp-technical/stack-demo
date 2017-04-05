import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

class component extends React.PureComponent {
  onFetchFromLocal = () => {
    this.props.fromLocal('This is the data that has been sourced locally.')
  }
  onFetchFromApi = () => {
    this.props.fromApi()
  }
  onReload = () => {
    window.location.reload()
  }
  render () {
    var {source, data} = this.props
    return (
      <components.Box>
        <h2>Feature: <i>fetch</i></h2>
        <h3>Fetching and Displaying Data</h3>
        <p>
          Shows the various ways data can make its way to your feature's REACT component:
        </p>
        <ul>
          <li>
            <h4>Initialisation Data from the API</h4>At application start-up the feature's state can be initialised from the API. This is useful when you want to initialise your component state from a database
            or from a third party source.
          </li>
          <li>
            <h4>Fetched Locally</h4>Local data fetched from the browser-side app.
          </li>
          <li>
            <h4>Fetched From the API</h4>Remote data fetched from the server-side api as required
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
        <RaisedButton label='Fetch Data Locally' onClick={this.onFetchFromLocal} style={buttonStyle} />
        <RaisedButton label='Fetch Data from the API' onClick={this.onFetchFromApi} style={buttonStyle} />
        <RaisedButton label='Restart the App' onClick={this.onReload} style={buttonStyle} />
      </components.Box>
    )
  }
}

const mapStateToProps = (state) => ({
  source: services.fetch.selector.getSource(state),
  data: services.fetch.selector.getData(state)
})

const mapDispatchToProps = (dispatch) => ({
  fromLocal: (data) => dispatch(actionHub.FETCH_FROM_LOCAL(data)),
  fromApi: () => dispatch(actionHub.FETCH_FROM_API())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
