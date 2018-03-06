import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Card, CardTitle, CardText, CardMedia, CardActions } from 'material-ui/Card'
import { services, components, actionHub } from '../../loader'

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
  imageURL:'https://i.ebayimg.com/images/g/pJoAAOSwx~JWE2t0/s-l300.jpg',
  name: 'BB8 Star Wars Ep VII',
  price: 10
}

class component extends Component {

  submitRating = (rating) => {
    this.props.rateProduct(rating)
  }

   render() {

     const {ratingWrapper, ratingCard} = styles
     let{ ratedProducts, numberOfReviews} = this.props
     let {id, imageURL, name, price} = product
     return (
       <div style={ratingWrapper}>
         <Card style={ratingCard}>
           <CardTitle title={name} />
           <CardMedia>
             <img src={imageURL} style={{display: 'block', margin: 'auto'}} />
            </CardMedia>
            <CardTitle title={`$ ${price}`} />
            <CardText>
              <components.rating
                iconNumber={5}
                btnLabel='Rate this item'
                id={id}
                reviews={numberOfReviews[id]}
                medianRating={ratedProducts[id]}
                onClick={this.submitRating}
                symbolContainerStyle={{width:30}} />
            </CardText>
       </Card>
     </div>
     );
   }
 }

 const mapStateToProps = (state) => {
   let {shopping:{products=[]}} = state
   const {ratingBar:{selector:{getProductRatingScores, getNumberOfProductReviewers}}} = services
   return{
     ratedProducts: getProductRatingScores(state, products),
     numberOfReviews: getNumberOfProductReviewers(state, products),
   }
 }

 const mapDispatchToProps = (dispatch) => {
   const {RATING_BAR_ADD_RATING} = actionHub
   return{
     rateProduct:(rating) => dispatch(RATING_BAR_ADD_RATING(rating)),
   }
 }

export default connect(mapStateToProps, mapDispatchToProps)(component)
