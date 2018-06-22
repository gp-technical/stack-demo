/* global location */

import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
// import { stackReduxApp, setupClientAnalytics } from '@gp-technical/stack-pack-app'
import { stackReduxApp } from '@gp-technical/stack-pack-app'
import App from './App'
import { env, services } from './loader'

// TODO - add the analytics back in

var opts = {
  websocketUrl: env.websocketUrl,
  websocketOpts: { query: location.search },
  devTools: true
}
const store = createStore(services, stackReduxApp(opts))

const container = document.getElementById('app')

window.addEventListener('resize', function() {
  container.style.height = `${window.innerHeight}px`
})

document.getElementsByTagName('body')[0].style['padding'] = '0'
document.getElementsByTagName('body')[0].style['margin'] = '0'

// setupClientAnalytics({ container: 'app', store, clickingExtraSelectors: ['.click-check'] })

container.style.overflowY = 'auto'
container.style.height = `${window.innerHeight}px`

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container
)

if (module.hot) {
  module.hot.accept()
}
