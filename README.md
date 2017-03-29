# stack-demo
Get started with the GP stack using this introductory demo application

## What is the stack?
The stack consists of two packages that together allow you to quickly build single page applications using the REACT and REDUX technologies. They exist to take away much of the boilerplate and leave you with more time to create innovative and useful applications.  These packages are:

* [stack-redux-app](https://github.com/gp-technical/stack-redux-app)
* [stack-redux-api](https://github.com/gp-technical/stack-redux-api)

The stack is deliberately opinionated. This means there _is_ a right way to do things and the packages have been designed to work best if they are used in the right way.

This demo has been written to give you concrete examples of the right way to use the packages. It is a reference demo, it does nothing in particular, but what it does do has been selected to provide a graduated introduction to the ways of the stack.

## Getting Started
You will need help getting set up to run this demo. The stack does a number of complex tasks for you, for example it ensures your application is capable of Single Sign On (SSO) and it also performs a security handshake with the main GP API so your applications have access to the GP content and data. All this requires setup and so you should contact [Jonny](janderson@goodpractice.com) or [Daniel](ddeak@goodpractice) to see about getting everything working.


## Project Folder Structure
The folder structure for a stack project should be:
```
my-project
  |-api
    |-src
      |-service
  |-app
    |-src
      |-component
      |-service
```
You can see that the application is first divided into two main domains, the `api` and the `app`. Both of these contain a `service` folder. The `app` also contains a `component` folder. It is important that you structure your stack application in this way, using these names.

### Features
This demo consists of a series of features. Each feature will typically consist of three items:

1. An `api` service
1. An `app` service
1. An `app` component

Each item is named after the feature, so for the example feature called `fetch` the project items will look like this:

```
stack-demo
  |-api
    |-src
      |-service
        |-fetch
  |-app
    |-src
      |-component
        |-fetch
      |-service
        |-fetch
```

## Feature: `hello`

This is the simplest feature in the demo. It is just a dumb REACT app component, and too simple to require an `api` or `app` service, but it shows you that the file is placed in `app/src/component/hello` folder.
### _app/src/component/hello/index.js_
```javascript
import React from 'react'

const style = {
  margin: 20,
  padding: 20,
  borderColor: 'lightgray',
  borderStyle: 'solid',
  borderWidth: 1,
  backgroundColor: 'White'
}

class component extends React.PureComponent {
  render () {
    return (
      <div style={style}>
        <h2>Hello World</h2>
      </div>
    )
  }
}

export default component
```

For the stack to know about this component it must be included in the `app/src/component/index.js` file.

### _app/src/component/index.js_
```javascript
import counter from './counter'
import errors from './errors'
import fetch from './fetch'
import gp from './gp'
import hello from './hello'
import thunks from './thunks'

export default {counter, errors, fetch, gp, hello, thunks}
```
You can see the `hello` component being exported, along with the other components. Since the component has been correctly exported via the `index.js` file, it is available for use as a standard REACT component. Here it is being used in the `app/src/App.jsx` file.

### _app/src/App.jsx_
```javascript
import { components, services } from './loader'
class component extends React.PureComponent {
  render () {
    return (
        ...
        <components.hello />
        ...
    )
  }
}
```

The `hello` component is exposed via the `components` object that has been imported in from the `loader` file. You do not need to touch the `loader` file. It takes care of exporting all the shared components and services so you can import them whenever you want to use them. All you need to do is make sure you export your own components and services via the corresponding `app/src/component/index.js` file and `app/src/service/index.js` so the `loader` can find them.

## Feature: `fetch`
This feature shows how a `app` component gets its data.

1. As initialisation data 'pushed' from the `api` at startup
1. As remote data 'fetched' from the `api` as required
1. As local data supplied by the `app`

### Feature Structure

```
stack-demo
  |-api
    |-src
      |-service
        |-fetch
          |-index.js
          |-initialiser.js
          |-processor.js
  |-app
    |-src
      |-component
        |-fetch
          |-index.js
      |-service
        |-fetch
          |-action.js
          |-index.js
          |-name.js
          |-reducer.js
          |-selector.js
```
From the structure above you can see that, in common with most features, the `fetch` feature has a REACT UI component found in `app/src/component/fetch/index.js`.

It is also the first feature to require a proper service. A feature's service is typically split into two folders, the `app` 'service' folder and the `api` 'service' folder. Each of the service folders contain several specially named files. Depending on capabilities of your feature you may not need all the files, but the files are always named this way. It is very important that you name your feature files in the same way.

### The `app` Service Files

### _app/src/service/fetch/name.js_
```javascript
const name = 'fetch'

export default name
```
Exports the unique feature name. This is used by other feature components and by the stack, for example to correctly namespace generated REDUX Actions.

### _app/src/service/fetch/action.js_
```javascript
import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const api = makeTypes(name, ['fromApi'])
const local = makeTypes(name, ['fromLocal'])

const actions = {...makeActions(api), ...makeActions(local, {local: true})}
const types = {...api, ...local}

export { actions, types }

```
Exports the generated REDUX actions and types. The `stack-redux-app` package provides the `makeActions` and `makeTypes` functions to remove nearly all of the REDUX boilerplate.

Above you see two different types of action being generated. The actions marked with the `local` flag will only be dispatched to the reducers in the `app`, the `api` will not be involved.

If the `local` flag is not set (the default case) then the actions will be dispatched to the local reducers as before but will also be automatically broadcast, via a bi-directional web-socket created for you by the stack, to the `api` where they can be picked up by the api service `processor` file (more on this further on).

### _app/src/service/fetch/reducer.js_
```javascript
const reducer = (state = {}, action) => {
  const {type, types, data} = action
  switch (type) {
    case types.fetch_init:
      return {...state, data, source: 'initial state pushed by the api'}
    case types.fetchFromLocal:
      return {...state, data, source: 'data fetched locally from the app'}
    case types.fetchFromApiResponse:
      return {...state, data, source: 'data fetched via the application api'}
    default:
      return state
  }
}

export default reducer
```
The REDUX reducer file listens for REDUX actions that have been dispatched either locally by the `app` or remotely by the `api`. The case statement tests the type of the action that has been received and acts accordingly. The type names have been generated for you from the names supplied to the `makeTypes` function above. They are namespaced with the name of the feature found in the `name.js` file.

This reducer shows the three different types of action that the stack will generate for you:

* `fetch_init`

  This is an optional action that is dispatched just once by the `api` during application start-up (if the api service supplies an `initialiser.js` file). It delivers a payload of feature specific initialisation data supplied by the `api`. Initialisation data delivered in this way is typically useful when your feature relies on a database or third-party api data-source.

* `fetchFromLocal`

  This is a traditional REDUX action. It is dispatched and processed locally. The type-name is a concatenation of the feature-name `fetch` plus the type-name `fromLocal`.

* `fetchFromApiResponse`

  This is the result of dispatching a REDUX action that was then processed by the `api`. If the `api` has data to return it will dispatch an action of type `<typeName>Response`. The type-name is concatenation of the feature-name `fetch` plus the originally dispatched type-name `fromApi` plus the response suffix `Response`

### _app/src/service/fetch/selector.js_
```javascript
import name from './name'

const get = (state) => {
  return state[name]
}

const getData = (state) => {
  return get(state).data
}

const getSource = (state) => {
  return get(state).source
}

export default {get, getData, getSource}
```
A selector is used to easily locate elements within the feature's REDUX state tree. When you require data from REDUX state you should always go through the appropriate feature's selector. You will typically see these being used by REACT components as a data-source for the components props.

### _app/src/service/fetch/index.js_
```javascript
import { actions, types } from './action'
import reducer from './reducer'
import selector from './selector'

export default {actions, types, reducer, selector}
```

It is important that you export the service files via the feature's `index.js`. This is true for both the app service files and the api service files.
### _app/src/service/index.js_
```javascript
import counter from './counter'
import errors from './errors'
import fetch from './fetch'
import gp from './gp'
import thunks from './thunks'

export default {counter, errors, fetch, gp, thunks}
```
The feature service is then further exported through the `app/src/service/index.js` file. This makes the feature available via the `loader`.


### The `api` Service Files

### _api/src/service/fetch/initialiser.js_
```javascript
const initialiser = async () => {
  return `This is the initial value for the data. It was sent by the stack-demo API, specifically the 'fetch' service initialiser, at startup.`
}

export default initialiser
```
This file is optional. If present the supplied initialiser function must be marked as `async`. The function can then directly return whatever data it deems appropriate. A benefit of being an `async` function is the ability to `await` the results of any database or third-party api calls you might need when gathering initialisation data.

The data returned, in common with all data returned by the api, can be normal javascript types or plain objects, it does not need to be JSON. The stack takes care of transmitting the data for you (over the websocket) by dispatching a special action with the type-name `<featureName>_init`. This action type can then be picked up by an app reducer and the data incorporated into the local REDUX state tree in the usual way.

### _api/src/service/fetch/processor.js_
```javascript
import { makeProcessor } from '@gp-technical/stack-redux-api'

const processor = async (action) => {
  var {types, type, data} = action

  switch (type) {
    case types.fetchFromApi:
      return await 'Hello from the stack-demo API'
  }
}

export default makeProcessor(processor)
```
An api `processor` plays a similar role as the app `reducer`. It listens out for actions and processes those it is interested in. It is important that you use the `makeProcessor` function to export the actual processor. This allows for error reporting and for more advanced techniques covered later.

Your processor can simply return data, as you see above, and this will automatically be sent back to the app as the payload of a generated `<typeName>Response` action. In this case the action type-name used to return the data would be `fetchFromApiResponse` (see the [reducer](#appsrcservicefetchreducerjs) code above).

### _api/src/service/fetch/index.js_
```javascript
import initialiser from './initialiser'
import processor from './processor'

export default { initialiser, processor}

```
It is important that you export the api service files via the feature's `index.js` file.

### _api/src/service/index.js_
```javascript
import counter from './counter'
import errors from './errors'
import fetch from './fetch'
import gp from './gp'
import thunks from './thunks'

export default { counter, errors, fetch, gp, thunks}
```
The feature is then further exported through the `api/src/service/index.js` file to make the stack aware of its existence. This allows the stack to find and make use of your service elements such as the initialiser and processor files.


### The `app` Component
### _app/src/component/fetch/index.jsx_
```javascript
import React from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import { actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

class component extends React.PureComponent {
  onFetchFromLocal = () => {
    this.props.fromLocal('This is the data that has been sourced locally.')
  }
  onFetchFromApi = () => {
    this.props.fromApi()
  }
  onReload = () => {
    window.location.reload()
  }
  render () {
    var {source, data} = this.props
    return (
      <components.Box>
        <h2>Fetching Data</h2>
        //
        // ... More REACT Markup
        //
        <RaisedButton label='Fetch Data Locally' onClick={this.onFetchFromLocal} style={buttonStyle} />
        <RaisedButton label='Fetch Data from the API' onClick={this.onFetchFromApi} style={buttonStyle} />
        <RaisedButton label='Reload the Page' onClick={this.onReload} style={buttonStyle} />
        //
        // ... More REACT Markup
        //        
      </components.Box>
    )
  }
}

const mapStateToProps = (state) => ({
  source: services.fetch.selector.getSource(state),
  data: services.fetch.selector.getData(state)
})

const mapDispatchToProps = (dispatch) => ({
  fromLocal: (data) => dispatch(actionHub.FETCH_FROM_LOCAL(data)),
  fromApi: () => dispatch(actionHub.FETCH_FROM_API())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
```
The app component is written using the standardised style shown above. All stack components conform to this style. The stack provides the following helper objects via the `loader` file.

* _actionHub_

  This contains _all_ the actions that have been defined by _any_ feature in the app. The action names conform to the standard REDUX format. They are capitalised and are namespaced with the feature name that generated them. You can use the actionHub throughout your code to dispatch any action, or combinations of actions (thunks), regardless of which feature generated them. You will often find them being dispatched via the `mapDispatchToProps` function.

* _services_

  This contains all the app services plus any shared services supplied by the `stack-redux-app` package. Typically these will be used to gain access to a features `selector` and so to it's state tree. These are used, in any combination from any service, as props for the component via the `mapStateToProps` function.

* _components_

   This contains all the app components you have exported via the `app/src/component/index.js` file plus any shared services supplied by the `stack-redux-app` package. In the code above the `components.Box` is used. This is an example of a shared component that is supplied by the `stack-redux-app` package.

### _app/src/component/index.js_
```javascript
import counter from './counter'
import errors from './errors'
import fetch from './fetch'
import gp from './gp'
import hello from './hello'
import thunks from './thunks'

export default {counter, errors, fetch, gp, hello, thunks}
```
The feature component is then exported through the `app/src/component/index.js` file. This makes the feature's component available via the `loader`.
