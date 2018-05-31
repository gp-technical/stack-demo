import React, { Component, isValidElement } from 'react'
import propTypes from 'prop-types'

const { bool, element, object, oneOfType, string } = propTypes

const defaultContainerStyle = {
  display: 'inline-block',
  position: 'relative',
  backGroundColor: 'white'
}

const defaultIconStyle = {
  display: 'inline-block',
  overflow: 'hidden',
  top: 0,
  padding: '0.25em'
}

class RatingSymbol extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return this.props.active !== nextProps.active
  }

  _makeSymbol = () => {
    let { active, disabled, icon } = this.props

    let isActive = disabled ? false : active

    if (!icon) {
      return <div style={isActive ? { color: 'yellow' } : { color: 'grey' }}>★</div>
    }
    // valid react element just return it
    if (isValidElement(icon)) {
      return icon
    }
    // If it is an object, try to use it as a CSS style object.
    if (typeof icon === 'object' && icon !== null) {
      return <span style={icon} />
    }
    // If it is a string, use it as class names.
    if (Object.prototype.toString.call(icon) === '[object String]') {
      return <span className={icon} />
    }
  }

  _handleMouseAction = e => {
    let { onMouseMove, value } = this.props
    if (onMouseMove) {
      onMouseMove(value)
    }
  }

  render() {
    let { symbolContainerStyle, symbolStyle, disabled, onMouseLeave = () => {} } = this.props
    let iStyle = { ...defaultIconStyle, ...symbolStyle }
    let containerStyle = {
      ...defaultContainerStyle,
      ...{ cursor: !disabled ? 'pointer' : 'auto' },
      ...symbolContainerStyle
    }

    return (
      <div style={containerStyle}>
        <div
          style={iStyle}
          onMouseLeave={onMouseLeave}
          onClick={this._handleMouseAction}
          onMouseMove={this._handleMouseAction}
          onTouchMove={this._handleMouseAction}
          onTouchEnd={this._handleMouseAction}
        >
          {this._makeSymbol()}
        </div>
      </div>
    )
  }
}

RatingSymbol.defaultProps = {
  disabled: false,
  active: false,
  symbolContainerStyle: {},
  symbolStyle: {}
}

RatingSymbol.propTypes = {
  disabled: bool,
  active: bool,
  icon: oneOfType([element, object, string]),
  symbolContainerStyle: object,
  symbolStyle: object
}

export default RatingSymbol
