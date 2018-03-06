import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import propTypes from 'prop-types'
import RatingSymbol from './RatingSymbol'
import FlatButton from 'material-ui/FlatButton';

const {func, number, object, oneOf, oneOfType, string} = propTypes
const defaultDirection = 'left'
const ratedStyle = {
  fontSize: '0.65em',
  fontStyle: 'italic'
}

class Rating extends Component {

  constructor(props){
    super(props)
    this.state = { rating: 0}
  }

  componentWillMount(){
    this.thresholdSymbol = null
  }

  componentDidMount(){
    let symbol = findDOMNode(this.thresholdSymbol)
    this.symbolBoundingClientRec = symbol.getBoundingClientRect()
    this.mousePosition = this.symbolBoundingClientRec
  }

  _onContainerMouseLeave = (e) => {
      this.mousePosition = e.target.getBoundingClientRect()
      this._setRating(0)
  }
  _onContainerMouseMove = (e) => {
      this.mousePosition = e.target.getBoundingClientRect()
  }

  _handleMouseMove = (value) => {
    let {rating} = this.state

    if(value !== rating ){

      this._setRating(value)
    }
  }

   _handleOnClick = () => {

     let {rating} = this.state
     let {description, disabled, onClick} = this.props

     if (disabled) {
       e.stopPropagation()
       e.preventDefault()
       return false

     } else {
         if(onClick){
           onClick({rating, description})
         }
     }
   }

   _setRating = (value) => {
      this._isValid() ? this.setState({rating: value}):this.setState({rating:0})
   }

   _isValid = () => {
     let {direction} = this.props
     let {mousePosition, symbolBoundingClientRec} = this
     return direction === defaultDirection ? (mousePosition.left) > symbolBoundingClientRec.left  : (mousePosition.right) <  symbolBoundingClientRec.right
   }

   _generateIcons = (number) => {

       let {description, direction, iconNumber, symbolContainerStyle, symbolStyle} = this.props
       let {rating} = this.state
       let refIndex = direction === defaultDirection ? 0 : iconNumber-1
       return Array(number).fill(null).map((n, index) => {
        let value = index + 1
        let active = rating === 0 ? false  : value <= rating

        const defaultProps = {
           key: index,
           active,
           description,
           value,
           symbolContainerStyle,
           symbolStyle,
           onClick: this._handleOnClick,
           onMouseMove: this._handleMouseMove
         }

         return (index === refIndex ?
           <RatingSymbol
             ref={(symbol) => {this.thresholdSymbol = symbol}}
             {...defaultProps}
             />
             :
             <RatingSymbol
               {...defaultProps}
               />
             )
           }
         )
       }

   render() {

     let {disabled, iconNumber, btnLabel, btnLabelStyle} = this.props
     let {rating} = this.state

     return (
      <div ref={(container) => {this.symbolContainer = container}} style={{marginLeft: 5 , marginRight: 5}} onMouseLeave={this._onContainerMouseLeave}>
          <div onMouseMove={this._onContainerMouseMove} >
          {
            btnLabel &&
            <FlatButton label={btnLabel} disabled={disabled} onClick={this._handleOnClick} labelStyle={btnLabelStyle}/>
          }
          <div style={{display: 'flex', 'flexDirection': 'row', marginLeft: 5 , marginRight: 5}}>
            { iconNumber > 0 &&
              this._generateIcons(iconNumber)
            }
          </div>
          {
            rating > 0 ?
            <span style={ratedStyle}>{`${rating} people have rated this item`}</span>
            :
            <span style={ratedStyle}>{'Be the first to rate this item'}</span>
          }
        </div>
      </div>
     );
   }
 }

Rating.propTypes = {
  btnLabel: string,
  btnLabelStyle: object,
  description: oneOfType([object, string]),
  direction: oneOf(['right', 'left']),
  onClick: func,
  onMouseMove: func,
  symbolContainerStyle: object,
  symbolStyle: object
}

Rating.defaultProps = {
  btnLabel: string.isRequired,
  onClick: func.isRequired,
  btnLabelStyle: {fontSize: 10},
  direction: 'left',
  symbolContainerStyle: {width: 20},
  symbolStyle: {}
}

export default Rating
