import React from 'react'
import { services, actionHub } from '../../loader'
import { connect } from 'react-redux'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'

const buttonStyle = {
  margin: 12
}

class component extends React.PureComponent {
  state = { value: '' }

  onFilterByCategory = (event, index, value) => {
    this.setState({ value })
    const category = value === 0 ? '' : this.props.categories[index]
    this.props.filterByCategory(category)
  }

  onFilterPriceRange = range => {
    this.props.filterByPrice(range)
  }

  render() {
    var { categories, priceRange } = this.props
    if (categories && categories.length > 0) {
      if (!categories.includes('All')) categories.unshift('All')
      const menuItems = categories.map((category, index) => (
        <MenuItem value={index} key={index}>
          {category}
        </MenuItem>
      ))
      const buttons = priceRange.map((range, index) => (
        <Button
          key={index}
          style={buttonStyle}
          onClick={() => {
            this.onFilterPriceRange(range)
          }}
        >
          {range.label}
        </Button>
      ))
      return (
        <div>
          <InputLabel htmlFor="items">Filter by Category</InputLabel>
          <Select onChange={this.onFilterByCategory} id="items" value={this.state.value}>
            {menuItems}
          </Select>
          <p>Filter by price range</p>
          {buttons}
        </div>
      )
    } else {
      return <div> No categories on the store </div>
    }
  }
}

const mapStateToProps = state => ({
  categories: services.shopping.selector.getCategories(state),
  priceRange: services.shopping.selector.getPriceRange(state)
})

const mapDispatchToProps = dispatch => ({
  filterByCategory: category => dispatch(actionHub.SHOPPING_PRODUCT_FILTER_BY_CATEGORY(category)),
  filterByPrice: range => dispatch(actionHub.SHOPPING_PRODUCT_FILTER_BY_PRICE_RANGE(range))
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(component)
