import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { stackReduxApp } from '@gp-technical/stack-pack-app'
import App from './App'
import { env, services } from './loader'
import injectTapEventPlugin from 'react-tap-event-plugin'
import setupClickingAnalytics from './component/analytics/clicking'

injectTapEventPlugin()

var opts = {
  websocketUrl: env.websocketUrl,
  devTools: true
}

const store = createStore(services, stackReduxApp(opts))

window.addEventListener("resize", function() {
  document.getElementById("wrapper").style.height = `${window.innerHeight}px`;
});

document.getElementsByTagName("body")[0].style["padding"] = "0";
document.getElementsByTagName("body")[0].style["margin"] = "0";

setupClickingAnalytics(store)

const styleDiv = { height:`${window.innerHeight}px`, "overflow-y": "auto" };

ReactDOM.render(
  <div id="wrapper" style={styleDiv}>
    <Provider store={store}>
      <App />
    </Provider>
  </div>,
  document.getElementById('app'))
