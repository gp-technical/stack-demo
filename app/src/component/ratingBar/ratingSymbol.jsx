import React, {Component,isValidElement,PropTypes} from 'react';
import propTypes from 'prop-types'

const {bool, element, number, object, oneOfType, string} = propTypes

const defaultContainerStyle = {
  display: 'inline-block',
  position: 'relative',
  backGroundColor:'white'
};

const defaultIconStyle = {
  display: 'inline-block',
  overflow: 'hidden',
  top: 0,
  padding: '0.25em'
 };

class RatingSymbol extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.active !== nextProps.active
  }

_makeIcon(icon, isActive) {

  if(!icon){
    return <div style={isActive ? {color: 'yellow'} : {color: 'grey'}}>★</div>
  }
// valid react element just return it
   if(isValidElement(icon)){
     return icon
   }
   // If it is an object, try to use it as a CSS style object.
  if (typeof icon === 'object' && icon !== null) {
    return <span style={icon} />;
  }
  // If it is a string, use it as class names.
  if (Object.prototype.toString.call(icon) === '[object String]') {
    return <span className={icon} />;
  }
}

_handleMouseMove = (e) => {
  let {onMouseMove, rating, description} = this.props
  if (onMouseMove) {
    onMouseMove({rating, description});
  }
}

_handleOnClick = (e) => {
    let {onClick, rating, description} = this.props
  if (onClick) {
    // [Supporting both TouchEvent and MouseEvent](https://developer.mozilla.org/en-US/docs/Web/API/Touch_events/Supporting_both_TouchEvent_and_MouseEvent)
    // We must prevent firing click event twice on touch devices.
    e.preventDefault();
    onClick({rating, description});
  }
}


  render() {

    let {icon, disabled, active, symbolContainerStyle, symbolStyle, title} = this.props
    let iStyle ={...defaultIconStyle, ...symbolStyle}
    let containerStyle ={ ...defaultContainerStyle, ...{cursor: !disabled ? 'pointer' : 'auto'}, ...symbolContainerStyle}

    return (
      <div style={containerStyle} title={title}>
          <div
            style={iStyle}
            onClick={this._handleOnClick}
            onMouseMove={this._handleMouseMove}
            onTouchMove={this._handleOnClick}
            onTouchEnd={this._handleOnClick}
          >
            {this._makeIcon(icon, active)}
          </div>
      </div>
    );
  }
}

RatingSymbol.defaultProps = {
  disabled: false,
  active: false,
  rating: 0,
  symbolContainerStyle: {},
  symbolStyle: {}
}

RatingSymbol.propTypes = {
  disabled: bool,
  active: bool,
  rating: number,
  description: oneOfType([object, string]),
  icon: oneOfType([element, object, string]),
  symbolContainerStyle: object,
  symbolStyle: object
}

export default  RatingSymbol
