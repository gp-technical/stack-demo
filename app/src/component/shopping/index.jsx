import React from 'react'
import { connect } from 'react-redux'
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import Snackbar from 'material-ui/Snackbar'
import TextField from 'material-ui/TextField'
import { DebounceInput } from 'react-debounce-input'

import { services, components, actionHub } from '../../loader'

class component extends React.PureComponent {
  state = {
    isCardOpen: false,
    isSnackBarOpen: false,
    productBeingAdded: null
  }

  onCardClose = () => {
    this.setState({isCardOpen: false})
  }

  onCardOpen = () => {
    this.setState({isCardOpen: true})
    this.props.resetCard()
  }

  onSearchInput = (e) => {
    this.props.searchProducts(e.target.value)
  }

  onAddProductToCard = (product) => {
    this.props.addItemToCard(product)
    this.setState({ productBeingAdded: product, isSnackBarOpen: true })
  }

  onRemoveProductFromCard = (product) => {
    this.props.removeProductFromCard(product)
  }

  onRemoveProductBeingAdded = () => {
    this.props.removeProductFromCard(this.state.productBeingAdded)
    this.onSnackBarClose()
  }

  onSnackBarClose = () => {
    this.setState({ productBeingAdded: null, isSnackBarOpen: false })
  }

  onCheckoutCard = (products) => {
    this.props.checkoutCard(products)
  }

  productBeingAddedSnackText = () => {
    if (this.state.productBeingAdded) {
      return `${this.state.productBeingAdded.name} was added to card`
    } else {
      return 'Product was added to card'
    }
  }

  render () {
    var { products } = this.props
    return (
      <components.Box>
        <h2>Feature: <i>Shopping</i></h2>
        <Toolbar style={{background: '#e0e0e0'}}>
          <ToolbarGroup firstChild={true}>
            <ToolbarTitle
              style={{color: '#54647a', marginLeft: 20}}
              text="Products"
            />
          </ToolbarGroup>
          <ToolbarGroup firstChild={true}>
            <DebounceInput
              element={TextField}
              minLength={0}
              debounceTimeout={500}
              hintText="Search by name, category..."
              onChange={this.onSearchInput} />
          </ToolbarGroup>
          <ToolbarGroup>
            <FlatButton
              style={{color: '#54647a'}}
              label={`Card(${this.props.productsInCard.length})`}
              onClick={() => { this.onCardOpen() }}
            />
          </ToolbarGroup>
        </Toolbar>
        <components.productList
          products={products}
          onAddProductToCard={this.onAddProductToCard}
        />
        <components.shoppingCard
          isCardOpen={this.state.isCardOpen}
          onCardClose={this.onCardClose}
          products={this.props.productsInCard}
          onRemoveProductFromCard={this.onRemoveProductFromCard}
          onCheckoutCard={this.onCheckoutCard}
          isHandlingCheckout={this.props.isHandlingCheckout}
          checkoutCompleted={this.props.checkoutCompleted}
        />
        <Snackbar
          open={this.state.isSnackBarOpen}
          action="Remove"
          message={this.productBeingAddedSnackText()}
          autoHideDuration={4000}
          onRequestClose={this.onSnackBarClose}
          onActionTouchTap={this.onRemoveProductBeingAdded}
        />
      </components.Box>
    )
  }
}

const mapStateToProps = (state) => ({
  products: services.shopping.selector.getProducts(state),
  productsInCard: services.shopping.selector.getProductsInCard(state),
  isHandlingCheckout: services.shopping.selector.getHandlingCheckout(state),
  checkoutCompleted: services.shopping.selector.getCheckoutCompleted(state)
})

const mapDispatchToProps = (dispatch) => ({
  addItemToCard: (product) => dispatch(actionHub.SHOPPING_ADD_PRODUCT_TO_CARD(product)),
  removeProductFromCard: (product) => dispatch(actionHub.SHOPPING_REMOVE_PRODUCT_FROM_CARD(product)),
  checkoutCard: (products) => dispatch(actionHub.SHOPPING_CHECKOUT_CARD(products)),
  resetCard: () => dispatch(actionHub.SHOPPING_RESET_CARD()),
  searchProducts: (query) => dispatch(actionHub.SHOPPING_SEARCH_PRODUCTS(query))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
