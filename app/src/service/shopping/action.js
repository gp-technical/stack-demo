import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-pack-app'

const api = makeTypes(name, [
  'productFilterByCategory',
  'productFilterByPriceRange',
  'productCartAdd',
  'productCartRemove'
])

const local = makeTypes(name, ['snackbarClose', 'cartOpen', 'cartClose'])

const both = makeTypes(name, ['cartCheckout', 'productSearch'])

const actions = {
  ...makeActions(both),
  ...makeActions(local),
  ...makeActions(api)
}

const types = {
  ...api,
  ...local,
  ...both
}

export { actions, types }
