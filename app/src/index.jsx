import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { stackReduxApp, setupClientAnalytics } from '@gp-technical/stack-pack-app'
import App from './App'
import { env, services } from './loader'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

var opts = {
  websocketUrl: env.websocketUrl,
  devTools: true
}
const store = createStore(services, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  stackReduxApp(opts))

const container = document.getElementById('app')

window.addEventListener('resize', function() {
  container.style.height = `${window.innerHeight}px`;
});

document.getElementsByTagName('body')[0].style['padding'] = '0';
document.getElementsByTagName('body')[0].style['margin'] = '0';

setupClientAnalytics({ container: 'app', store, clickingExtraSelectors: [".click-check"]})

container.style.overflowY = 'auto'
container.style.height = `${window.innerHeight}px`

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  container)
