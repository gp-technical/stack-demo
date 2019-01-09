import React, { Component } from 'react'
import { connect } from 'react-redux'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import { services, components, actionHub } from '../../loader'
import Rating from './rating'

const styles = {
  ratingWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  ratingCard: {
    marginLeft: 20,
    marginTop: 20,
    maxWidth: '30%'
  }
}

const product = {
  id: 1,
  imageURL: 'https://i.ebayimg.com/images/g/pJoAAOSwx~JWE2t0/s-l300.jpg',
  name: 'BB8 Star Wars Ep VII',
  price: 10
}

class component extends Component {
  submitRating = rating => {
    this.props.rateProduct(rating)
  }

  render() {
    const { ratingWrapper, ratingCard } = styles
    let { ratedProducts, numberOfReviews } = this.props
    let { submitRating } = this
    let { id, name, price } = product
    return (
      <components.Box>
        <h2>
          Feature: <i>Rating Bar</i>
        </h2>
        <div style={ratingWrapper}>
          <Card style={ratingCard}>
            <CardHeader title={name} />
            <CardHeader title={`$ ${price}`} />
            <CardMedia
              image="https://i.ebayimg.com/images/g/pJoAAOSwx~JWE2t0/s-l300.jpg"
              style={{ display: 'block', margin: 'auto' }}
              component="img"
            />
            <CardContent>
              <Rating
                iconNumber={5}
                btnLabel="Rate this item"
                id={id}
                reviews={numberOfReviews[id]}
                medianRating={ratedProducts[id]}
                onClick={submitRating}
                symbolContainerStyle={{ width: 30 }}
              />
            </CardContent>
          </Card>
        </div>
      </components.Box>
    )
  }
}

const mapStateToProps = state => {
  let {
    shopping: { products = [] }
  } = state
  const {
    ratingBar: {
      selector: { getProductRatingScores, getNumberOfProductReviewers }
    }
  } = services
  return {
    ratedProducts: getProductRatingScores(state, products),
    numberOfReviews: getNumberOfProductReviewers(state, products)
  }
}

const mapDispatchToProps = dispatch => {
  const { RATING_BAR_ADD_RATING } = actionHub
  return {
    rateProduct: rating => dispatch(RATING_BAR_ADD_RATING(rating))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
