import React, {Component} from 'react'
import {findDOMNode} from 'react-dom'
import propTypes from 'prop-types'
import RatingSymbol from './RatingSymbol'

const {func, number, object, oneOf, oneOfType, string} = propTypes
const defaultDirection = 'left'
const ratedStyle = {
  display: 'block',
  fontSize: '0.25em',
  fontStyle: 'italic'
}
class component extends Component {

  shouldComponentUpdate({rating}, nextState) {
    return this.props.rating !== rating
  }

  componentWillMount(){
    this.thresholdSymbol = null
  }

  componentDidMount(){
    let symbol = findDOMNode(this.thresholdSymbol)
    this.symbolBoundingClientRec = symbol.getBoundingClientRect()
    this.mousePosition = this.symbolBoundingClientRec
  }

  _onContainerMouseMove = (e) => {
    let {onMouseMove} = this.props
    this.mousePosition = e.target.getBoundingClientRect()

     if(!this._isValid() && onMouseMove){
       onMouseMove(0)
     }
  }

   _handleMouseMove = (newValue) => {
     let {mousePosition, symbolBoundingClientRec} = this
     let {rating, onMouseMove, direction} = this.props
      if(onMouseMove){
          this._isValid() ? onMouseMove(newValue) : onMouseMove({value: 0 , description: null })
      }
   }

   _handleOnClick = (newValue) => {

     let{disabled, onClick} = this.props

     if (disabled) {
       e.stopPropagation()
       e.preventDefault()
       return false

     } else {
         if(onClick){
           this._isValid(newValue) ? onClick(newValue) : onClick({value: 0 , description: null })
         }
     }
   }

   _isValid = (value) => {
     let {direction} = this.props
     let {mousePosition, symbolBoundingClientRec} = this
     return direction === defaultDirection ? mousePosition.left > symbolBoundingClientRec.left  :mousePosition.right <  symbolBoundingClientRec.right
   }

   _generateIcons = (number) => {

       let {rating, description, direction, iconNumber, symbolContainerStyle, symbolStyle} = this.props

       let refIndex = direction === defaultDirection ? 0 : iconNumber-1

       return Array(number).fill(null).map((n, index) => {

        let active = rating === 0 ? false  : index <= rating
        let value = index + 1

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

     let {iconNumber, title, titleStyle, rating} = this.props

     return (
      <div onMouseMove={this._onContainerMouseMove} style={{marginLeft:'0.25em'}}>
        {
          title &&
          <span>{ title }</span>
        }
        <div style={{display: 'flex', 'flexDirection': 'row'}}>
          { iconNumber > 0 &&
            this._generateIcons(iconNumber)
          }
        </div>
        {
          rating > 0 ?
          <span style={{ratedStyle}}>{`${rating} people have rated this item`}</span>
          :
          <span style={{fontSize: '0.65em', fontStyle: 'italic'}}>{'Be the first to rate this item'}</span>
        }
      </div>
     );
   }
 }

component.propTypes = {
  description: oneOfType([object, string]),
  direction: oneOf(['right', 'left']),
  onClick: func,
  onMouseMove: func,
  rating: number,
  symbolContainerStyle: object,
  symbolStyle: object,
  title: string,
  value:number,

}

component.defaultProps = {
  direction: 'left',
  rating: 0,
  value: 0,
  symbolContainerStyle: {},
  symbolStyle: {},
  titleStyle: {textAlign: 'center'}
}

export default component
