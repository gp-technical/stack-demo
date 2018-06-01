import React from 'react'
import { connect } from 'react-redux'
import { Toolbar, ToolbarGroup, ToolbarTitle } from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import { DebounceInput } from 'react-debounce-input'

import { services, components, actionHub } from '../../loader'

class component extends React.PureComponent {
  // handleCart = e => {
  //   this.props.open === false ? this.props.cartOpen : this.props.cartClose
  // }

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
          <ToolbarGroup firstChild>
            <ToolbarTitle style={{ color: '#54647a', marginLeft: 20 }} text="Products" />
          </ToolbarGroup>
          <ToolbarGroup firstChild>
            <DebounceInput
              element={TextField}
              minLength={0}
              debounceTimeout={500}
              placeholder="Search by name, category..."
              onChange={this.onSearchInput}
            />
          </ToolbarGroup>
          <ToolbarGroup>
            <Button style={{ color: '#54647a' }} onClick={this.props.cartOpen}>{`Cart(${
              productsInCart ? productsInCart.length : 0
            })`}</Button>
          </ToolbarGroup>
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
)(component)
