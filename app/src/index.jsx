import 'babel-polyfill'
import env from './env'
import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { services } from './loader'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { saml } from '@gp-technical/stack-auth-app'
import { stackReduxApp } from '@gp-technical/stack-pack-app'

var opts = {
  websocketUrl: env.websocketUrl,
  authenticator: saml,
  devTools: true
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
