import React from 'react'
import Dialog from 'material-ui/Dialog'
import { connect } from 'react-redux'
import FlatButton from 'material-ui/FlatButton'
import FontIcon from 'material-ui/FontIcon'
import { red500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'

import { services, actionHub, components } from '../../loader'

const style = {
  noProduct: {
    textAlign: 'center'
  },
  total: {
    textAlign: 'right'
  }
}

class component extends React.PureComponent {

  columns = {
    name: 'Name',
    price: {
      label: 'Price',
      format: ({price}) => `$ ${price}`
    },
    actions: {
      label: 'Actions',
      custom: (row) => (<FlatButton
        onClick={() => {
          this.onProductCartRemove(row)
        }}
      >
        <FontIcon className="material-icons" color={red500}>
          delete
        </FontIcon>
      </FlatButton>)
    }
  }

  onProductCartRemove = (product) => {
    this.props.productCartRemove(product)
  }

  onCartCheckout = () => {
    this.props.cartCheckout()
  }

  cartTotal = () => {
    let total = this.props.productsInCart.reduce((currentTotal, product) => {
      return currentTotal + product.price
    }, 0)
    return total.toFixed(2)
  }

  renderActions = () => {
    var { productsInCart } = this.props
    if (productsInCart && productsInCart.length > 0) {
      return [
        <FlatButton label="Back Shopping" onClick={this.props.cartClose} />,
        <FlatButton
          label="Checkout"
          primary={true}
          onClick={ () => { this.onCartCheckout() }}
        />
      ]
    } else {
      return [
        <FlatButton
          label="Back Shopping"
          primary={true}
          onClick={this.props.cartClose}
        />
      ]
    }
  }

  renderProductsInCart = () => {
    var { productsInCart } = this.props
    if (productsInCart && productsInCart.length > 0) {
      return (
        <div>
          <components.Table rows={productsInCart} columns={this.columns} />
          <div style={style.total}> Total: ${this.cartTotal()} </div>
        </div>
      )
    } else {
      return <p style={style.noProduct}>No product in Cart.</p>
    }
  }

  renderDialogContent = () => {
    const { isHandlingCheckout, isCheckoutCompleted } = this.props

    if (isHandlingCheckout) {
      return (
        <div style={{ textAlign: 'center' }}>
          <CircularProgress />
          <p> Checking payment </p>
        </div>
      )
    } else if (isCheckoutCompleted) {
      return (<div style={{textAlign: 'center'}}> Checkout completed </div>)
    } else {
      return this.renderProductsInCart()
    }
  }

  render () {
    var { isCartOpen } = this.props
    return (
      <Dialog
        title="Shopping Cart - Checkout"
        modal={false}
        open={isCartOpen}
        onRequestClose={this.props.cartClose}
        actions={this.renderActions()}
      >
        {this.renderDialogContent()}
      </Dialog>
    )
  }
}

const mapStateToProps = state => ({
  isCartOpen: services.shopping.selector.getCartOpen(state),
  productsInCart: services.shopping.selector.getProductsInCart(state),
  isCheckoutCompleted: services.shopping.selector.getIsCheckoutCompleted(state),
  isHandlingCheckout: services.shopping.selector.getHandlingCheckout(state)
})

const mapDispatchToProps = dispatch => ({
  cartOpen: () => dispatch(actionHub.SHOPPING_CART_OPEN()),
  cartClose: () => dispatch(actionHub.SHOPPING_CART_CLOSE()),
  cartCheckout: () => dispatch(actionHub.SHOPPING_CART_CHECKOUT()),
  productCartRemove: (product) => dispatch(actionHub.SHOPPING_PRODUCT_CART_REMOVE(product))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
