import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import propTypes from 'prop-types'
import RatingSymbol from './RatingSymbol'
import Button from '@material-ui/core/Button'

const { func, number, object, oneOf, oneOfType, string } = propTypes

const defaultDirection = 'left'

const ratedStyle = {
  fontSize: '0.65em',
  fontStyle: 'italic'
}

const personStr = 'person has rated this item'
const peopleStr = 'people have rated this item'

class Rating extends Component {
  constructor(props) {
    super(props)
    this.state = { rating: 0, rated: props.reviews > 0 }
  }

  componentDidMount() {
    let symbol = findDOMNode(this.refs.symbol)
    this.symbolBoundingClientRec = symbol.getBoundingClientRect()
    this.mousePosition = this.symbolBoundingClientRec
  }

  componentWillReceiveProps({ reviews }) {
    if (reviews !== this.props.reviews) {
      this.setState({ rated: true })
    }
  }

  _onContainerMouseLeave = e => {
    this.mousePosition = e.target.getBoundingClientRect()
    this._setRating(0)
  }
  _onContainerMouseMove = e => {
    this.mousePosition = e.target.getBoundingClientRect()
  }

  _handleMouseMove = value => {
    let { rating } = this.state

    if (value !== rating) {
      this._setRating(value)
    }
  }

  _handleOnClick = () => {
    let { rating } = this.state
    let { id, disabled, onClick } = this.props

    if (disabled) {
      return false
    } else {
      if (onClick) {
        onClick({ rating, id })
      }
    }
  }

  _setRating = rating => {
    this._isValid() ? this.setState({ rating }) : this.setState({ rating: 0 })
  }

  _isValid = () => {
    let { direction } = this.props
    let { mousePosition, symbolBoundingClientRec } = this
    return direction === defaultDirection
      ? mousePosition.left > symbolBoundingClientRec.left
      : mousePosition.right < symbolBoundingClientRec.right
  }

  _generateIcons = number => {
    let { id, direction, iconNumber, symbolContainerStyle, symbolStyle } = this.props
    let { rating } = this.state
    let refIndex = direction === defaultDirection ? 0 : iconNumber - 1
    return Array(number)
      .fill(null)
      .map((n, index) => {
        let value = index + 1
        let active = rating === 0 ? false : value <= rating

        const defaultProps = {
          key: index,
          active,
          id,
          value,
          symbolContainerStyle,
          symbolStyle,
          onClick: this._handleOnClick,
          onMouseMove: this._handleMouseMove
        }

        return index === refIndex ? (
          <RatingSymbol ref="symbol" {...defaultProps} />
        ) : (
          <RatingSymbol {...defaultProps} />
        )
      })
  }

  render() {
    let { disabled, iconNumber, btnLabel, btnLabelStyle, reviews, medianRating } = this.props
    let { rated } = this.state

    return (
      <div style={{ marginLeft: 5, marginRight: 5 }} onMouseLeave={this._onContainerMouseLeave}>
        <div onMouseMove={this._onContainerMouseMove}>
          {btnLabel && (
            <Button disabled={disabled} onClick={this._handleOnClick} labelstyle={btnLabelStyle}>
              {btnLabel}
            </Button>
          )}
          <div style={{ display: 'flex', flexDirection: 'row', marginLeft: 5, marginRight: 5 }}>
            {iconNumber > 0 && this._generateIcons(iconNumber)}
          </div>
          {rated ? (
            <div>
              <div>
                <span style={ratedStyle}>
                  {reviews && reviews > 1 ? `${reviews} ${peopleStr}` : `${reviews} ${personStr}`}
                </span>
              </div>
              <div>
                <span style={ratedStyle}>{`Current rating ${medianRating}`}</span>
              </div>
            </div>
          ) : (
            <span style={ratedStyle}>{'Be the first to rate this item'}</span>
          )}
        </div>
      </div>
    )
  }
}

Rating.propTypes = {
  btnLabel: string,
  btnLabelStyle: object,
  id: oneOfType([number, string]),
  direction: oneOf(['right', 'left']),
  onClick: func,
  onMouseMove: func,
  symbolContainerStyle: object,
  symbolStyle: object,
  avgRating: number,
  reviews: number
}

Rating.defaultProps = {
  btnLabel: string.isRequired,
  onClick: func.isRequired,
  btnLabelStyle: { fontSize: 10 },
  direction: 'left',
  symbolContainerStyle: { width: 20 },
  symbolStyle: {}
}

export default Rating
