import React from 'react'
import { Card, CardTitle, CardMedia, CardActions } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'

const style = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'space-between'
}

class component extends React.PureComponent {
  render () {
    var { products } = this.props
    if (products && products.length > 0) {
      return (
        <div style={style}>
          {products.map((product, index) => (
            <Card key={index} style={{marginTop: 20, maxWidth: '30%'}}>
              <CardTitle title={product.name} subtitle={product.description} />
              <CardMedia>
                <img src={product.imageURL} style={{display: 'block', margin: 'auto'}} />
              </CardMedia>
              <CardTitle title={`$ ${product.price}`} subtitle={product.categories.join()} />
              <CardActions>
                <FlatButton label="Add to Cart" onClick={() => { this.props.onAddProductToCard(product) }} />
              </CardActions>
            </Card>
         ))}
        </div>
      )
    } else {
      return (<div> No product in the store </div>)
    }
  }
}

export default component
