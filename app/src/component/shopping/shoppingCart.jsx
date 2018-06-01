import React from 'react'
import Dialog from '@material-ui/core/Dialog'
import { connect } from 'react-redux'
import FlatButton from '@material-ui/core/FlatButton'
import FontIcon from '@material-ui/core/FontIcon'
import { red500 } from '@material-ui/core/styles/colors'
import CircularProgress from '@material-ui/core/CircularProgress'
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
  TableFooter
} from '@material-ui/core/Table'

import { services, actionHub } from '../../loader'

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
        <FlatButton label="Back Shopping" onClick={this.props.cartClose} />,
        <FlatButton
          label="Checkout"
          primary
          onClick={() => {
            this.onCartCheckout()
          }}
        />
      ]
    } else {
      return [<FlatButton label="Back Shopping" primary onClick={this.props.cartClose} />]
    }
  }

  renderProductsInCart = () => {
    var { productsInCart } = this.props
    if (productsInCart && productsInCart.length > 0) {
      return (
        <Table selectable={false}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false} enableSelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Price</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
              <TableHeaderColumn>Acions</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {productsInCart.map((product, index) => (
              <TableRow key={index}>
                <TableRowColumn>{product.name}</TableRowColumn>
                <TableRowColumn>$ {product.price}</TableRowColumn>
                <TableRowColumn>{product.description}</TableRowColumn>
                <TableRowColumn>
                  <FlatButton
                    onClick={() => {
                      this.onProductCartRemove(product)
                    }}
                  >
                    <FontIcon className="material-icons" color={red500}>
                      delete
                    </FontIcon>
                  </FlatButton>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter adjustForCheckbox={false}>
            <TableRow>
              <TableRowColumn colSpan="4" style={{ textAlign: 'right' }}>
                Total: ${this.cartTotal()}
              </TableRowColumn>
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
