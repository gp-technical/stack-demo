import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const addProductToCard = makeTypes(name, ['addProductToCard'])
const removeProductFromCard = makeTypes(name, ['removeProductFromCard'])
const checkoutCard = makeTypes(name, ['checkoutCard'])
const resetCard = makeTypes(name, ['resetCard'])
const searchProducts = makeTypes(name, ['searchProducts'])

const actions = {
  ...makeActions(addProductToCard, {local: true}),
  ...makeActions(removeProductFromCard, {local: true}),
  ...makeActions(checkoutCard),
  ...makeActions(resetCard, {local: true}),
  ...makeActions(searchProducts)
}

const types = {
  ...addProductToCard,
  ...removeProductFromCard,
  ...checkoutCard,
  ...resetCard,
  ...searchProducts
}

export { actions, types }
