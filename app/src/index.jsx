/* global location */

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { stackReduxApp } from '@gp-technical/stack-pack-app'
import App from './App'
import { env, services } from './loader'
import { saml } from '@gp-technical/stack-auth-app'

var opts = {
  websocketUrl: env.websocketUrl,
  websocketOpts: { query: location.search }, // for the app initialiser
  devTools: true,
  authenticator: saml
}
const store = createStore(services, stackReduxApp(opts))

const container = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
)

if (module && module.hot) {
  module.hot.accept()
}
