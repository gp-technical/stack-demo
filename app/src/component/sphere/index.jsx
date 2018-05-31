import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import TextField from 'material-ui/TextField'
import { actionHub, services, components } from '../../loader'
import { DebounceInput } from 'react-debounce-input'

const sup = {
  position: 'relative',
  bottom: '1ex',
  fontSize: '80%'
}

class component extends React.PureComponent {
  onRadiusChange = e => {
    this.props.getVolume(parseInt(e.target.value))
  }

  render() {
    const { radius, volume } = this.props
    return (
      <components.Box>
        <h2>
          Feature: <i>Sphere</i>
        </h2>
        <h3>Retrieve volume result via an API Service</h3>
        <p>
          Calculating the volume of a sphere with an API service while keeping the volume of earth
          as a default state
        </p>
        <Divider />
        <h4>Formula of a sphere's volume:</h4>
        <p>
          V=(4/3)π r<i style={sup}>3</i>
        </p>
        <DebounceInput
          element={TextField}
          minLength={1}
          debounceTimeout={500}
          hintText="Enter a Radius"
          defaultValue={radius}
          onChange={this.onRadiusChange}
        />
        <span>Km</span>
        <p>
          The volume is : {volume}
          &nbsp;Km<i style={sup}>3</i>
        </p>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  radius: services.sphere.selector.getRadius(state),
  volume: services.sphere.selector.getVolume(state)
})

const mapDispatchToProps = dispatch => ({
  getRadius: data => dispatch(actionHub.SPHERE_GET_RADIUS(data)),
  getVolume: data => dispatch(actionHub.SPHERE_GET_VOLUME(data))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
