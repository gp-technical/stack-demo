import React from 'react'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import CardActions from '@material-ui/core/CardActions'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
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
  onProductCartAdd = product => {
    this.props.productCartAdd(product)
  }

  onProductCartRemove = product => {
    this.props.productCartRemove(product)
  }

  onProductAddedRemove = () => {
    this.props.productCartRemove(this.props.productAdded)
  }

  onSnackbarClose = product => {
    this.props.snackbarClose()
  }

  productAddedSnackText = () => {
    if (this.props.productAdded) {
      return `${this.props.productAdded.name} was added to cart`
    } else {
      return 'Product was added to cart'
    }
  }

  render() {
    var { products, isSnackBarOpen } = this.props
    if (products && products.length > 0) {
      return (
        <div style={style.productWrapper}>
          {products.map((product, index) => (
            <Card key={index} style={style.productCard}>
              <CardHeader title={product.name} subheader={product.description} />
              <CardContent>
                <CardMedia
                  title={product.name}
                  image={product.imageURL}
                  style={{ display: 'block', margin: 'auto' }}
                  component='img'
                />
                <Typography variant='h6'>{`$ ${product.price}`}</Typography>
                <Typography variant='subtitle1'>{product.categories.join()}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() => {
                    this.onProductCartAdd(product)
                  }}
                >
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
          <Snackbar
            open={isSnackBarOpen}
            action='Remove'
            message={this.productAddedSnackText()}
            autoHideDuration={4000}
            onRequestClose={this.onSnackbarClose}
            onActionClick={this.onProductAddedRemove}
          />
        </div>
      )
    } else {
      return <div> No product in the store </div>
    }
  }
}

const mapStateToProps = state => ({
  products: services.shopping.selector.getProducts(state),
  productAdded: services.shopping.selector.getProductAdded(state),
  isSnackBarOpen: services.shopping.selector.getIsSnackbarOpen(state)
})

const mapDispatchToProps = dispatch => ({
  productCartAdd: product => dispatch(actionHub.SHOPPING_PRODUCT_CART_ADD(product)),
  productCartRemove: product => dispatch(actionHub.SHOPPING_PRODUCT_CART_REMOVE(product)),
  snackbarClose: () => dispatch(actionHub.SHOPPING_SNACKBAR_CLOSE())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
