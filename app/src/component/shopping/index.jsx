import React from 'react'
import { connect } from 'react-redux'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import { DebounceInput } from 'react-debounce-input'

import { services, components, actionHub } from '../../loader'

class Shopping extends React.PureComponent {
  onSearchInput = e => {
    this.props.productSearch(e.target.value)
  }

  render() {
    const { productsInCart, isCartOpen } = this.props

    return (
      <components.Box>
        <h2>
          Feature: <i>Shopping</i>
        </h2>
        <Toolbar style={{ background: '#e0e0e0' }}>
          <Typography style={{ color: '#54647a', marginLeft: 20 }}>Products</Typography>
          <DebounceInput
            element={TextField}
            minLength={0}
            debounceTimeout={500}
            placeholder='Search by name, category...'
            onChange={this.onSearchInput}
          />
          <Button style={{ color: '#54647a' }} onClick={this.props.cartOpen}>{`Cart(${
            productsInCart ? productsInCart.length : 0
          })`}</Button>
        </Toolbar>
        <components.shoppingFilter />
        <components.productList />
        <components.shoppingCart isCartOpen={isCartOpen} onCartClose={this.props.cartClose} />
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  isCartOpen: services.shopping.selector.getCartOpen(state),
  productsInCart: services.shopping.selector.getProductsInCart(state)
})

const mapDispatchToProps = dispatch => ({
  cartOpen: () => dispatch(actionHub.SHOPPING_CART_OPEN()),
  cartClose: () => dispatch(actionHub.SHOPPING_CART_CLOSE()),
  productSearch: query => dispatch(actionHub.SHOPPING_PRODUCT_SEARCH(query))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Shopping)
