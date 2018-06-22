import React from 'react'
import { connect } from 'react-redux'
import { components, services } from '../../loader'

const AppInitialiser = ({ backgroundColor = 'white' }) => {
  return (
    <components.Box>
      <div>
        <h2>
          Feature: <i>App Initialiser</i>
        </h2>
        <p>If the url contains a query param of the form</p>
        <pre>?tenantkey=dev1</pre>
        <p>
          Where the value is a valid tenant key for the toolkit, the background color of the div
          below will be rendered using the color specified in the subscription for the given tenant.
          If there is no valid query param of that form the background color will be white.
        </p>
        <p>
          Try <code>?tenantkey=tesco-academy</code> or <code>?tenantkey=virgin-atlantic</code> to
          see a different branding colours.
        </p>
        <p>
          The app initialiser is implemented using code on the both the app and the api. In addition
          stack-pack-api and stack-pack-app provide support for the feature. In the Stack Demo app
          the file <code>app/src/index.jsx</code>
          passes up a <code>websocketOpts</code> object that can contain anything. In this example
          it has any query param that is contained in the URL. The code looks like:
        </p>
        <pre>
          var opts = {'{'}
          websocketUrl: env.websocketUrl, websocketOpts: {'{'} query: location.search {'}'},
          devTools: true
          {'}'}
        </pre>
        <p>
          The object provided as the value for <code>websocketOpts</code> is serialised and passed
          in to the app initialiser that is defined on the API.
        </p>
        <p>
          The implementation for the app initialiser function lives in{' '}
          <code>api/src/initialiser.js</code>. The initialiser module should have a default export
          that is a function with a signature like:
        </p>
        <code>const initialiser = (user, websocketOpts) => ...</code>
        <p>
          The value returned by the app initialiser will be passed into each of the service
          initialisers as their second argument.
        </p>
        <p>
          This example uses the tenant key to run a query on the GPAPI to get the subscription which
          is then used within the service initialiser to retrieve the branding. The work was split
          across the app initialiser and service initialisers to show how the value returned from
          the app initialiser is handed into the server initialisers.
        </p>
      </div>
      <div style={{ height: '100px', backgroundColor }} />
    </components.Box>
  )
}

const mapStateToProps = state => ({
  backgroundColor: services.appInitialiser.selector.getBackgroundColor(state)
})

export default connect(mapStateToProps)(AppInitialiser)
