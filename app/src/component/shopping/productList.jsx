import React from 'react'
import { Card, CardTitle, CardMedia, CardActions } from 'material-ui/Card'
import Snackbar from 'material-ui/Snackbar'
import FlatButton from 'material-ui/FlatButton'
import { connect } from 'react-redux'

import { services, actionHub } from '../../loader'

const style = {
  productWrapper: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  productCard: {
    marginLeft: 20,
    marginTop: 20,
    maxWidth: '30%'
  }
}

class component extends React.PureComponent {

  onProductCartAdd = (product) => {
    this.props.productCartAdd(product)
  }

  onProductCartRemove = (product) => {
    this.props.productCartRemove(product)
  }

  onProductAddedRemove = () => {
    this.props.productCartRemove(this.props.productAdded)
  }

  onSnackbarClose = (product) => {
    this.props.snackbarClose()
  }

  productAddedSnackText = () => {
    if (this.props.productAdded) {
      return `${this.props.productAdded.name} was added to cart`
    } else {
      return 'Product was added to cart'
    }
  }

  render () {
    var { products, isSnackBarOpen } = this.props
    if (products && products.length > 0) {
      return (
        <div style={style.productWrapper}>
          {products.map((product, index) => (
            <Card key={index} style={style.productCard}>
              <CardTitle title={product.name} subtitle={product.description} />
              <CardMedia>
                <img src={product.imageURL} style={{display: 'block', margin: 'auto'}} />
              </CardMedia>
              <CardTitle title={`$ ${product.price}`} subtitle={product.categories.join()} />
              <CardActions>
                <FlatButton label="Add to Cart" onClick={() => { this.onProductCartAdd(product) }} />
              </CardActions>
            </Card>
         ))}
         <Snackbar
           open={ isSnackBarOpen }
           action="Remove"
           message={this.productAddedSnackText()}
           autoHideDuration={4000}
           onRequestClose={this.onSnackbarClose}
           onActionTouchTap={this.onProductAddedRemove}
         />
        </div>
      )
    } else {
      return (<div> No product in the store </div>)
    }
  }
}

const mapStateToProps = (state) => ({
  products: services.shopping.selector.getProducts(state),
  productAdded: services.shopping.selector.getProductAdded(state),
  isSnackBarOpen: services.shopping.selector.getIsSnackbarOpen(state)
})

const mapDispatchToProps = (dispatch) => ({
  productCartAdd: (product) => dispatch(actionHub.SHOPPING_PRODUCT_CART_ADD(product)),
  productCartRemove: (product) => dispatch(actionHub.SHOPPING_PRODUCT_CART_REMOVE(product)),
  snackbarClose: () => dispatch(actionHub.SHOPPING_SNACKBAR_CLOSE())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
