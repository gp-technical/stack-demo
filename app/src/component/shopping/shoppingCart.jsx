import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux'
import Button from '@material-ui/core/Button'
import Icon from '@material-ui/core/Icon'
import red from '@material-ui/core/colors/red'
import CircularProgress from '@material-ui/core/CircularProgress'
import Table from '@material-ui/core/Table'
import TableHeader from '@material-ui/core/TableHead'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import TableFooter from '@material-ui/core/TableFooter'
import { services, actionHub } from '../../loader'

const red500 = red[500]

const style = {
  noProduct: {
    textAlign: 'center'
  }
}

class component extends React.PureComponent {
  onProductCartRemove = product => {
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
        <Button onClick={this.props.cartClose} key={1}>
          Back Shopping
        </Button>,
        <Button
          primary
          onClick={() => {
            this.onCartCheckout()
          }}
          key={2}
        >
          Checkout
        </Button>
      ]
    } else {
      return [
        <Button primary onClick={this.props.cartClose} key={1}>
          Back Shopping
        </Button>
      ]
    }
  }

  renderProductsInCart = () => {
    var { productsInCart } = this.props
    if (productsInCart && productsInCart.length > 0) {
      return (
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Acions</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {productsInCart.map((product, index) => (
              <TableRow key={index}>
                <TableCell>{product.name}</TableCell>
                <TableCell>$ {product.price}</TableCell>
                <TableCell>{product.description}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      this.onProductCartRemove(product)
                    }}
                  >
                    <Icon className="material-icons" color={red500}>
                      delete
                    </Icon>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter adjustForCheckbox={false}>
            <TableRow>
              <TableCell colSpan="4" style={{ textAlign: 'right' }}>
                Total: ${this.cartTotal()}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
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
      return <div style={{ textAlign: 'center' }}> Checkout completed </div>
    } else {
      return this.renderProductsInCart()
    }
  }

  render() {
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
  productCartRemove: product => dispatch(actionHub.SHOPPING_PRODUCT_CART_REMOVE(product))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
