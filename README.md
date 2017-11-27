# stack-demo

Get started with the GP stack using this introductory demo application

## What is the stack?

The stack exists to allow you to quickly build single page applications using the REACT and REDUX technologies. It demands a specific way of writing your code, as well as helper features, that
together take away much of the boilerplate and leave you with more time to create innovative and useful applications.

The stack consists of the following two packages:

* [stack-redux-app](https://github.com/gp-technical/stack-redux-app)
* [stack-redux-api](https://github.com/gp-technical/stack-redux-api)

The stack is deliberately opinionated. This means there _is_ a right way to do things and the packages have been designed to work best if they are used in the right way.

This reference demo has been written to give you concrete examples of the right way to use the packages. It does nothing in particular, but what it does do has been selected to provide a graduated
introduction via a series a of _features_. In stack-speak, a feature just means all the bits of code that, when taken together, provide a useful chunk of functionality. As you will see, each feature
will typically have code that runs on the server (the `api` service), the client (the `app` service) and some UI code (the `app` component).

Starting simply then, the stack-demo shows you how to structure your project, re-use the shared features supplied by the stack and then write your own custom features that together go to make up your
own stack-application.

## Getting Started

You will probably need some devops help getting set up to run this demo. The stack does a number of complex tasks for you, for example it ensures your application is capable of Single Sign On (SSO)
and it also performs a security handshake with the main GP API so your applications have access to the GP content and data. All this requires setup and so you should contact
[Jonny](janderson@goodpractice.com) or [Daniel](ddeak@goodpractice) to see about getting everything working.

## The stack-application Folder Structure

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

You can see that the application is first divided into two main domains, the `api` and the `app`. Both of these contain a `service` folder. The `app` also contains a `component` folder. It is
important that you structure your stack application in this way, using these names.

### Some Theory

> At its heart, the stack is just a web-socket that connects your `app` to your `api`. As is usual for a REACT / REDUX application, when you dispatch a REDUX action then the expectation is that
> somewhere in your code there will be reducer(s) listening out for that action so that local state can be changed. Your REACT components then react to these changes and update the UI.
>
> All this remains true for a `stack-application` with one additional consideration - by default any dispatched REDUX action will also be broadcast to your `api` where it can be trigger server-side
> processing. Since web-sockets work in both directions, so your `api` can also dispatch actions that your `app` can listen out for, for example to return data requested by the `app`.
>
> The upshot of this is the machine boundary between your `app` and your `api` is eliminated. You do not need to worry about the plumbing that allows your browser-side `app` code to communicate with
> the server-side `api` code. Internal REST apis and http calls within your application space are a thing of the past. Everything is mediated via dispatched REDUX actions and the changes to local
> REDUX state they cause.

## Environment Variables

The `api` component of a stack application requires a set of environment values to be supplied via the `./api/.env` file. The file is _not_ included in the github repository as it contains sensitive
details. Each time you create a new stack application you must re-create the `.env` file and update its values as required.

* ## [sample environment file](#example-api-environment-file)

# Features

In stack-speak a _Feature_ is a unit of functionality. A feature _does something_, it is the way that we separate the 'concerns' of an application and bundle them up into useful, re-usable components.

A single feature can, and very often does, span both the `app` and `api`. Each feature typically consists of files that represent _app-side-logic_, _app-side-UI_ and _api-side-logic_. All these files
taken together allow a feature to do its thing easily; with the minimum of boilerplate; and without regard to the traditional app->||<-api machine-boundary.

## Features Explained

Each feature will typically consist of three items:

* An `api` service

  This is the code that runs on the server. It will typically call out to your data-store and return data payloads or perhaps interact securely with third party APIs

* An `app` service

  This is the code that runs in the browser and is used to update your application's REDUX state, dispatch REDUX actions and request / receive data from the application api.

* An `app` component

  The is the REACT component used to surface and interact with the application state

Each feature has a unique `name` and in the project files, each feature item-folder uses the feature-name. For example, one of the first stack-demo features is called `fetch`, so for this feature the
project item-folders would be as follows:

```
stack-demo
  |-api
    |-src
      |-service
        |-fetch    <- the api service
  |-app
    |-src
      |-component
        |-fetch    <- the app component
      |-service
        |-fetch    <- the app service
```

### The Feature `index.js` files

For the stack to know about each part of a feature it must be exported via the relevant `index.js` file. The folders that contain the api services, the app components and the app services all have a
single index.js file and you must export your feature through these so the stack can discover them.

```
stack-demo
  |-api
    |-src
      |-service
        index.js      <- the index for all api services
        |-fetch
  |-app
    |-src
      |-component
        index.js      <- the index for all app components
        |-fetch
      |-service
        index.js      <- the index for all app services
        |-fetch
```

Here is the format for exporting each of the feature elements via the index files.

### _api/src/service/index.js_

```javascript
import fetch from './fetch'
export default { fetch }
```

### _app/src/component/index.js_

```javascript
import fetch from './fetch'
export default { fetch }
```

### _app/src/service/index.js_

```javascript
import fetch from './fetch'
export default { fetch }
```

You can see the `fetch` feature being exported in the same way via the three index files. This feature is now fully wired up and ready to use elsewhere in your code. For example, here is the fetch
REACT component being used in the `app/src/App.jsx` file.

### _app/src/App.jsx_

```javascript
import { components } from './loader'
class component extends React.PureComponent {
  render () {
    return (
        ...
        <components.fetch />
        ...
    )
  }
}
```

From the `App.jsx` code above you can see that accessing the `fetch` component is achieved through the `components` object and this is imported from the stack `loader`. The `loader` object contains
all the available app components and services, and since we have correctly exported our `fetch` component, we can now access here and use it in the `App.jsx` file.

Please note that you do not need to touch the `loader`. It takes care of automatically loading all the correctly exported components and services so you can import them whenever you want to use them.
This includes any shared features supplied by the stack packages. All you need to do is make sure you export your own features via the index files as shown above so the `loader` can find them.

For completeness, here is the real `app/src/service/index.js` file showing all the stack-demo app services being exported.

### _app/src/service/index.js_

```javascript
import counter from './counter'
import errors from './errors'
import fetch from './fetch'
import gp from './gp'
import thunks from './thunks'

export default { counter, errors, fetch, gp, thunks }
```

## The stack-demo Feature List

Like all stack applications, the `stack-demo` consists of a series of features. In this case the features are here to teach you how to use the stack, so they are all a little contrived and bare-bones.

The features start of simple and get more complex as they go on. Each feature extends and builds on the previous one to make a coherent learning experience.

The first few are essential reading if you want to use the stack at all, the rest introduce concepts that will get you doing genuinely useful things.

* ## [hello](#feature-hello)

  A simple hello-world react component. No stack involved.

* ## [fetch](#feature-fetch)

  Shows the three ways your feature can get it's hands on some data:

  * From the local `app`
  * Automatically as start-up initialisation data from the `api`
  * Requested from the `api` during normal running

  This is also a _Grand Tour_ of most of the feature files you will need to write any complex feature. The rest of the features below are much shorter as they only explain how they differ from this
  main example.

* ## [counter](#feature-counter)

  A simple, server-side counter. It shows how to :

  * update your application state by dispatching actions to the feature's `api` service.
  * expose selected aspects of the feature's api service though REST endpoints

* ## [errors](#feature-errors)

  Shows how to listen out for and process errors thrown by the api.

* ## [thunk](#feature-thunk)

  Once your features get interesting you may need to dispatch multiple sub-actions (thunks) for a given action, and sometimes these actions need to happen synchronously (sagas). The `stack` supports
  this advanced REDUX feature very cleanly.

* ## [gp](#feature-gp)

  As you might expect for an opinionated GP stack interacting with the GP-API has been made as low-friction as possible. This feature shows how you can use the main GP-API to:

  * initialise a drop-down of content folders
  * populate a table with the contents of the selected folder

  The table used is the shared table component supplied by the `stack-redux-app` package.

## Additional Features

The following features have been added to flesh out the example set and are offered here without any additional help. You can use these features to further enhance your understanding of the stack with
examples contributed by team members.

If you write your own demo-feature then please submit it for inclusion in this list.

* ## todos

Recreates the canonical REDUX demo application. This feature allows you to add / edit and delete list items to a todo list. It also shows how to use a material-ui input form when editing a todo item.

* ## sphere

Calculates the volume of a sphere. This feature shows simple `app` <-> `api` communication as well as a neat _debounce_ text box that throttles the user input to prevent excessive calls to the api

# Feature: `hello`

This is the simplest feature in the demo. It is just a dumb REACT app component and too simple to require an api or app service. It is here to show you that you don't need to do anything special if
you just want to include a standard REACT component.

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
  render() {
    return (
      <div style={style}>
        <h2>Hello World</h2>
      </div>
    )
  }
}

export default component
```

### _app/src/component/index.js_

```javascript
import counter from './counter'
import errors from './errors'
import fetch from './fetch'
import gp from './gp'
import hello from './hello'      <- export the hello feature component
import thunks from './thunks'

export default {counter, errors, fetch, gp, hello, thunks}
```

### _app/src/App.jsx_

```javascript
import { components } from './loader'
class component extends React.PureComponent {
  render () {
    return (
        ...
        <components.hello />      <- use the hello feature component via the loader.components
        <components.fetch />
        <components.counter />
        <components.errors />
        <components.thunks />
        <components.gp />
        ...
    )
  }
}
```

You can see the `hello` component has been exported via the `app/src/component/index.js` file, this makes it available to use via the `loader` object.

# Feature: `fetch`

This feature shows how an `app` component can get the data it needs. Either as:

* Initialisation data 'pushed' from the `api` at startup
* Remote data 'fetched' from the `api` as required
* Local data supplied by the `app`

Before looking into how the `fetch` feature manages its data its time to look at the general feature structure. All features follow the same structure.

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

The feature consists of three parts and although not all parts are always required for all features, _most_ useful features will consist of:

* The `api` service

  This is where you listen for and process server-side actions. The actions are typically dispatched from the app and are automatically broadcast to the api by the stack. You can also dispatch actions
  from the api back to the app and deliver initialisation data for your feature at application start-up

* The `app` component

  This is the REACT UI component. It is fairly standard and makes use of a few stack features that make dispatching actions and re-using other feature components easy.

* The `app` service

  This contains all the files required to set-up the REDUX actions and types, listen out for actions via a `reducer` and serve up state-tree data-elements via the feature's `selector`.

We will now use the `fetch` feature to go through each of the files that make up a feature. The `fetch` is actually pretty simple, but it deliberately touches on all the pieces you will need to write
your own complex features.

## The `app` Service Files

These files run in the browser. They use stack functions to define REDUX types and actions, take care of dispatching the actions and change local REDUX state in response to actions.

```
|-service
  |-fetch
    |-action.js     <- defines the REDUX actions and types for this feature
    |-index.js      <- exports the feature's app-service items
    |-name.js       <- supplies the unique feature name
    |-reducer.js    <- listens out for and processes REDUX actions
    |-selector.js   <- simplifies access to the feature's REDUX state tree
```

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
const both = makeTypes(name, ['fromBoth'])

const actions = { ...makeActions(api, { local: false }), ...makeActions(local, { local: true }), ...makeActions(both) }
const types = { ...api, ...local, ...both }

export { actions, types }
```

Exports the generated REDUX `actions` and `types`. The `stack-redux-app` package provides the `makeActions` and `makeTypes` functions to remove nearly all of the REDUX boilerplate.

Above you see two different types of action being generated. The actions marked with the `local` flag will only be dispatched to the reducers in the `app`, the `api` will not be involved.

#### The `local` flag

If the `local` flag is not set (the default case) then the actions will be automatically broadcast to _both_ the `app` and the `api`. Actions broadcast to the `app` can be intercepted by your REDUX
reducers in the usual way. Actions broadcast to the `api` can be picked up by server-side `processor` files that act very much like reducers. When an `api` processor returns a value to the `app` it
does so by dispatching an automatic `<original-typeName>Response` action.

* `local` : `undefined` (default)

  The action is dispatched to both the `app` reducers and the `api` processors

* `local` : `true`

  The action is dispatched to the `app` reducers only

* `local` : `false`

  The action is dispatched to the `api` processors only

### _app/src/service/fetch/reducer.js_

```javascript
const reducer = (state = {}, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.fetch_init:
      return { ...state, data, source: 'API' }
    case types.fetchFromLocal:
      return { ...state, data, source: 'APP' }
    case types.fetchFromApiResponse:
      return { ...state, data, source: 'API' }
    case types.fetchFromBoth:
      return { ...state, data, source: 'BOTH' }
    case types.fetchFromBothResponse:
      return { ...state, data: `${state.data} + ${data}`, source: 'BOTH' }
    default:
      return state
  }
}

export default reducer
```

The REDUX reducer file listens for REDUX actions that have been dispatched either locally by the `app` or remotely by the `api`. The case statement tests the type of the action that has been received
and acts accordingly. The type names have been generated for you from the names supplied to the `makeTypes` function above. They are name-spaced with the name of the feature found in the `name.js`
file.

This reducer shows the three different types of action that the stack will generate for you:

* `fetch_init`

  This action is dispatched just once by the `api` during application start-up (but only if the api service exports an `initialiser.js` file). It delivers a payload of feature specific initialisation
  data supplied by the `api`. Initialisation data delivered in this way is typically useful when your feature relies on a database or third-party api data-source.

* `fetchFromLocal`

  This is a traditional REDUX action. It is dispatched and processed locally. The type-name is a concatenation of the feature-name `fetch`+`fromLocal`, the type-name supplied to the `makeTypes`
  function in the `action.js` file above.

* `fetchFromApiResponse`

  This is the result of dispatching a REDUX action that was then processed by the `api`. If the `api` has data to return it will dispatch an action of type `<typeName>Response`. The type-name is
  concatenation of the feature-name `fetch` + `fromApi` (the type-name supplied to the `makeTypes` function) + `Response`, the `api` response suffix

### _app/src/service/fetch/selector.js_

```javascript
import name from './name'

const get = state => {
  return state[name]
}

const getData = state => {
  return get(state).data
}

const getSource = state => {
  return get(state).source
}

export default { getData, getSource }
```

A selector is used to easily locate elements within the feature's REDUX state tree. When you require data from REDUX state you should always go through the appropriate feature's selector. You will
typically see these being used by REACT components as a data-source for the components props.

#### Optimising Selector Code

The selector code shown above is simple. For more complex selectors and especially where the optimisation of cached data is desired, you should consider using a REDUX selector library such as
[reselect](https://github.com/reactjs/reselect). Regardless of your implementation details, the `selector.js` file above is the correct place to put the selector code for a given feature.

### _app/src/service/fetch/index.js_

```javascript
import { actions, types } from './action'
import reducer from './reducer'
import selector from './selector'

export default { actions, types, reducer, selector }
```

It is important that you export the service files via the feature's `index.js`.

### _app/src/service/index.js_

```javascript
import counter from './counter'
import errors from './errors'
import fetch from './fetch'
import gp from './gp'
import thunks from './thunks'

export default { counter, errors, fetch, gp, thunks }
```

The feature service is then further exported through the `app/src/service/index.js` file. This makes the feature available via the `loader`.

## The `api` Service Files

```
|-service
  |-fetch
    |-index.js        <- exports the feature's api-service items
    |-initialiser.js  <- provides feature specific data at application start-up
    |-processor.js    <- listens out for and processes REDUX actions
```

### _api/src/service/fetch/initialiser.js_

```javascript
const initialiser = async () => {
  return `This is the initial value for the data. It was sent by the stack-demo API, specifically the 'fetch' service initialiser, at startup.`
}

export default initialiser
```

This file is optional. If present the `initialiser` function must be marked as `async`. The function can then directly return whatever data is required by the feature at start-up. A benefit of being
an `async` function is the ability to `await` the results of any database or third-party api calls you might need when gathering initialisation data.

The data returned, in common with all data returned by the api, can be normal javascript types or plain objects, it does not need to be JSON. The stack takes care of transmitting the data for you
(over the websocket) by dispatching a special action with the type-name `<featureName>_init`. This is then processed by the feature's app reducer (see the [reducer](#appsrcservicefetchreducerjs) code
above)

### _api/src/service/fetch/processor.js_

```javascript
import { makeProcessor } from '@gp-technical/stack-redux-api'

const processor = async action => {
  var { types, type, data } = action

  switch (type) {
    case types.fetchFromApi:
      return 'Hello from the stack-demo API'
  }
}

export default makeProcessor(processor)
```

An api `processor` plays a similar role as the app `reducer`. It listens out for actions and processes those it is interested in. It is important that you use the `makeProcessor` function to export
the actual processor. This allows for error reporting and for more advanced techniques covered later.

Your processor can simply return data, as you see above, and this will automatically be sent back to the app as the payload of a generated `<typeName>Response` action. In this case the action
type-name used to return the data would be `fetchFromApiResponse` (see the [reducer](#appsrcservicefetchreducerjs) code above).

### _api/src/service/fetch/index.js_

```javascript
import initialiser from './initialiser'
import processor from './processor'

export default { initialiser, processor }
```

It is important that you export the api service files via the feature's `index.js` file.

## The `app` Component

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
  render() {
    var { source, data } = this.props
    return (
      <components.Box>
        <h2>Fetching Data</h2>
        // // ... More REACT Markup //
        <RaisedButton label="Fetch Data Locally" onClick={this.onFetchFromLocal} style={buttonStyle} />
        <RaisedButton label="Fetch Data from the API" onClick={this.onFetchFromApi} style={buttonStyle} />
        <RaisedButton label="Reload the Page" onClick={this.onReload} style={buttonStyle} />
        // // ... More REACT Markup //
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  source: services.fetch.selector.getSource(state),
  data: services.fetch.selector.getData(state)
})

const mapDispatchToProps = dispatch => ({
  fromLocal: data => dispatch(actionHub.FETCH_FROM_LOCAL(data)),
  fromApi: () => dispatch(actionHub.FETCH_FROM_API())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
```

The app component is written using the standardised style shown above. All stack components conform to this style. The stack provides the following helper objects via the `loader` file.

* _actionHub_

  This contains _all_ the actions that have been defined by _any_ feature in the app. The action names conform to the standard REDUX format. They are capitalised and are namespaced with the feature
  name that generated them. You can use the actionHub throughout your code to dispatch any action, or combinations of actions (thunks), regardless of which feature generated them. You will often find
  them being dispatched via the `mapDispatchToProps` function.

* _services_

  This contains all the app services plus any shared services supplied by the `stack-redux-app` package. Typically these will be used to gain access to a features `selector` and so to it's state tree.
  These are used, in any combination from any service, as props for the component via the `mapStateToProps` function.

* _components_

  This contains all the app components you have exported via the `app/src/component/index.js` file plus any shared services supplied by the `stack-redux-app` package. In the code above the
  `components.Box` is used. This is an example of a shared component that is supplied by the `stack-redux-app` package.

# Feature: `counter`

This feature implements a server-side `api` counter that simulates more complex interactions with either your data-source or a secure third-party `api`. It supports the following abilities:

* _getTotal_

  returns the current server-side counter value

* _increment_

  increases the server-side counter value by 1

* _decrement_

  decreases the server-side counter value by 1

These `api` abilities are triggered via REDUX actions in the usual way.

In addition they have been further exposed as REST endpoints using the built in stack feature that automatically mounts any express routes you export via the `router.js` api-service file.

## The `app` Service Files

### _app/src/service/counter/action.js_

```javascript
import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const types = makeTypes(name, ['getTotal', 'increment', 'decrement'])
const actions = makeActions(types)

export { actions, types }
```

The actions.js file defines three REDUX types and actions. All of these actions are to be processed by the `api`

### _app/src/service/counter/reducer.js_

```javascript
const reducer = (state = {}, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.counter_init:
    case types.counterGetTotalResponse:
    case types.counterIncrementResponse:
    case types.counterDecrementResponse:
      return { ...state, total: data.total }
    default:
      return state
  }
}

export default reducer
```

All the actions cause the `api` to generate an equivalent `<typename>Response` action. The reducer listens for these and processes the state change.

### _app/src/service/counter/selector.js_

```javascript
import name from './name'

const get = state => {
  return state[name]
}

const getTotal = state => {
  return get(state).total
}

export default { getTotal }
```

The selector allows access to the feature state. Here it is the single value representing the current state of the `api` counter.

## The `api` Service Files

### _api/src/service/counter/db.js_

```javascript
class db {
  static total = 0
  static increment() {
    this.total++
  }
  static decrement() {
    this.total--
  }
  static getTotal() {
    return this.total
  }
}

export default db
```

This is a simple simulation of a data-store.

### _api/src/service/counter/initialiser.js_

```javascript
import db from './db'

const initialiser = async () => {
  return { total: db.getTotal() }
}

export default initialiser
```

The initialiser calls out to the data-store to get the current value of the counter when the application first starts up.

### _api/src/service/counter/processor.js_

```javascript
import { makeProcessor } from '@gp-technical/stack-redux-api'
import db from './db'

const processor = async action => {
  var { types, type, data } = action
  switch (type) {
    case types.counterIncrement:
      db.increment()
      return { total: db.getTotal() }
    case types.counterDecrement:
      db.decrement()
      return { total: db.getTotal() }
    case types.counterGetTotal:
      return { total: db.getTotal() }
  }
}

export default makeProcessor(processor)
```

The processor file listens for each of the REDUX action types dispatched by the `app` and calls the interacts with the data-store accordingly. You can see each action potentially triggers more than
one data-store method and that the return from the processor is a plain, anonymous java-script object.

### _api/src/service/counter/router.js_

```javascript
import express from 'express'
import db from './db'

const router = express.Router({ mergeParams: true })

router.get('/counter/ping', (req, res) => {
  res.send(`The 'counter' service endpoints have been succesfully mounted : ${new Date().toLocaleString('en-GB')}`)
})

router.get('/counter/total', (req, res) => {
  res.json({ total: db.getTotal() })
})

router.get('/counter/increment', (req, res) => {
  db.increment()
  res.json({ total: db.getTotal() })
})
router.get('/counter/decrement', (req, res) => {
  db.decrement()
  res.json({ total: db.getTotal() })
})
export default router
```

Each of the feature's capabilities has been exposed via a REST endpoint. The `router.js` file exists to declare and export the endpoints using a standard express router object.

### _api/src/service/counter/index.js_

```javascript
import initialiser from './initialiser'
import processor from './processor'
import router from './router'

export default { initialiser, processor, router }
```

Note that the `router.js` file must be exported via the feature's index file for the endpoints to be discovered and automatically mounted by the stack.

## The `app` Component

### _app/src/component/counter/index.jsx_

```javascript
import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { env, actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

const url = path => {
  return `${env.apiUrl}/rest/counter/${path}`
}

class component extends React.PureComponent {
  onIncrementRedux = () => {
    this.props.increment()
  }
  onDecrementRedux = () => {
    this.props.decrement()
  }
  onGetTotalRedux = () => {
    this.props.getTotal()
  }
  onIncrementRest = () => {
    window.open(url('increment'), '_blank')
  }
  onDecrementRest = () => {
    window.open(url('decrement'), '_blank')
  }
  onGetTotalRest = () => {
    window.open(url('total'), '_blank')
  }
  render() {
    var { total } = this.props

    return (
      <components.Box>
        // ... REDUX Markup
        <h3>Dispatch REDUX Actions</h3>
        <RaisedButton label="Increment ++" onClick={this.onIncrementRedux} style={buttonStyle} />
        <RaisedButton label="Decrement --" onClick={this.onDecrementRedux} style={buttonStyle} />
        <RaisedButton label="Get Total" onClick={this.onGetTotalRedux} style={buttonStyle} />
        <Divider />
        <h3>Access the Equivalent REST Endpoints</h3>
        <ul>
          <li>
            <a href="#" onClick={this.onIncrementRest}>
              Increment
            </a>
          </li>
          <li>
            <a href="#" onClick={this.onDecrementRest}>
              Decrement
            </a>
          </li>
          <li>
            <a href="#" onClick={this.onGetTotalRest}>
              Get Total
            </a>
          </li>
        </ul>
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  total: services.counter.selector.getTotal(state)
})

const mapDispatchToProps = dispatch => ({
  getTotal: () => dispatch(actionHub.COUNTER_GET_TOTAL()),
  increment: () => dispatch(actionHub.COUNTER_INCREMENT()),
  decrement: () => dispatch(actionHub.COUNTER_DECREMENT())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
```

The REACT component does nothing special. It pulls in the REDUX state data in `mapStateToProps` using the feature's selector `services.counter.selector.getTotal` and it allows the feature's REDUX
actions to be dispatched via `mapDispatchToProps`.

# Feature: `errors`

When the `api` throws an error, or more specifically when code that is wrapped inside the `makeProcessor` function throws an error, that error is trapped by the stack. The full error is logged to
[Log Entries](https://logentries.com) and an error action containing a deliberately anodyne error message is dispatched so the `app` knows something went wrong.

This feature is an example of an edge-case where there is no need to have any local state change handled by your code, because the REDUX state change for the error message (dispatched by the `api`) is
baked into the stack. This means that although the feature still defines and dispatches its own REDUX actions, it has no `reducer` or `selector` files. The stack allows for this level of granularity.

## The `app` Service Files

### _app/src/service/counter/action.js_

```javascript
import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const types = makeTypes(name, ['throwFromApi'])
const actions = makeActions(types)

export { actions, types }
```

The actions.js file defines a single action to be processed by the `api`

## The `api` Service Files

### _api/src/service/errors/processor.js_

```javascript
import { makeProcessor } from '@gp-technical/stack-redux-api'

const processor = async action => {
  var { types, type, data } = action
  switch (type) {
    case types.errorsThrowFromApi:
      throw new Error('This is a test error that was thrown by the stack-demo API')
  }
}

export default makeProcessor(processor)
```

The `api` service `processor` file listen out for the REDUX action and throws a standard javascript error. Because the processor function is wrapped by the `makeProcessor` function, this error can be
intercepted and logged by the stack before dispatching an internal error action.

## The `app` Component

### _app/src/component/errors/index.jsx_

```javascript
import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import { actionHub, services, components } from '../../loader'

const buttonStyle = {
  margin: 12
}

class component extends React.PureComponent {
  onThrowFromApi = () => {
    this.props.throwFromApi()
  }

  render() {
    var { errorMessage } = this.props
    return (
      <components.Box>
        <h2>Displaying Errors From the API</h2>
        // ... REACT Markup
        <h3>
          <components.ErrorMessage text={errorMessage} />
        </h3>
        <Divider />
        <RaisedButton label="Thrown an API Error" onClick={this.onThrowFromApi} style={buttonStyle} />
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  errorMessage: services.errorMessage.selector.getText(state)
})

const mapDispatchToProps = dispatch => ({
  throwFromApi: () => dispatch(actionHub.ERRORS_THROW_FROM_API())
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
```

Note that this feature has no state of its own. Instead the `mapStateToProps` function reaches into the state tree of the `errorMessage` shared feature provided as part of the `stack-redux-app`
package.

The `errorMessage` feature will listen out for the internal error action that is automatically dispatched by the `api` when an error occurs in a processor and update the local state for you. It also
supplies the `selector.getText()` method you see being used to get the current error message.

# Feature: `thunk`

### _app/src/service/thunk/action.js_

```javascript
import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'
import { actionHub } from '../../loader'

const types = makeTypes(name, ['getAnswer'])
const actions = makeActions(types)

const thunksGetAnswer = actions.thunksGetAnswer
actions.thunksGetAnswer = () => {
  return async (dispatch, getState) => {
    dispatch(actionHub.SPINNER_ON())
    await dispatch(thunksGetAnswer())
    dispatch(actionHub.SPINNER_OFF())
  }
}

export { actions, types }
```

Here we see an example of how to customise an action that has been generated using the `makeActions` function.

The `getAnswer` action is first generated. A copy of the generated action is stored as `thunksGetAnswer` and the `actions.thunksGetAnswer` is then reset to a multi-action sequence with the
`thunksGetAnswer` action being sandwiched between a `SPINNER_ON` action and a `SPINNER_OFF` action, both of which have been defined via the shared `stack-redux-app` feature called `spinner`.

Because the action calls are asynchronous by default, and because the `thunksGetAnswer` invokes a long running, server-side process, the call to `thunksGetAnswer` is _awaited_ to make the sequence
synchronous. Now the spinner state is set and it stays that way until the `thunksGetAnswer` completes before being unset.

### _app/src/service/thunk/reducer.js_

```javascript
const reducer = (state = { answer: 'unknown' }, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.thunksGetAnswerResponse:
      return { ...state, answer: data.answer }
    default:
      return state
  }
}

export default reducer
```

The reducer handles the local REDUX state change using the data supplied by the api. The action it listens for is called `thunksGetAnswerResponse` because this is the return from the `thunksGetAnswer`
action dispatched in the thunk (see `action.js` above).

Note that _awaiting_ the `thunksGetAnswer` in the thunk does not change the way the data is sent back via the `thunksGetAnswerResponse`.

## The `api` Service Files

### _api/src/service/thunk/processor.js_

```javascript
import { makeProcessor } from '@gp-technical/stack-redux-api'

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const processor = async action => {
  var { types, type, data } = action
  switch (type) {
    case types.thunksGetAnswer:
      await sleep(3000)
      return { answer: 42 }
  }
}

export default makeProcessor(processor)
```

The api processor listens for the `thunksGetAnswer` action and just sleeps for three seconds before returning its data payload.

# Feature: `gp`

### _app/src/service/gp/action.js_

```javascript
import name from './name'
import { makeActions, makeTypes } from '@gp-technical/stack-redux-app'

const types = makeTypes(name, ['getDocuments'])
const actions = makeActions(types)

export { actions, types }
```

Define the `getDocuments` action for processing by the `api`

### _app/src/service/gp/reducer.js_

```javascript
const reducer = (state = {}, action) => {
  const { type, types, data } = action
  switch (type) {
    case types.gp_init:
      return { ...state, folders: data.Locations }
    case types.gpGetDocumentsResponse:
      return { ...state, documents: data }
    default:
      return state
  }
}

export default reducer
```

The api specifies an `initialiser` so listen for the automatically generated `gp_init` action to process the initial list of GP content folders.

When a folder is selected the `getDocuments` action is dispatched so listen for its automatically generated api response action `gpGetDocumentsResponse` and process the returned list of documents.

### _app/src/service/gp/selector.js_

```javascript
import name from './name'

const get = state => {
  return state[name]
}

const getDocuments = state => {
  return get(state).documents
}

const getFolders = state => {
  return get(state).folders
}

export default { getDocuments, getFolders }
```

The selector reaches into the feature REDUXC state to expose the data elements of use, in this case the list of folders and the currently selected list of documents.

The currently selected folder id (`selectedFolderId`) could have been stored here as well but it instead it is stored as part of the REACT app-component's local state.

## The `api` Service Files

### _api/src/service/gp/initialiser.js_

```javascript
import { gpapi } from '@gp-technical/stack-redux-api'

// Folder: Responsive Toolkit for Leaders_dev1_auto/Leadership & Strategy
const folderId = '46c2f86d-0655-009b-86cc-a3bf00ac087a'

const initialiser = async () => {
  return await gpapi.get(`location/parent-folder/${folderId}/child-folders`)
}

export default initialiser
```

The `gpapi` helper object is imported from the `gp-technical/stack-redux-api` package. It is then used to `get` a list of GP secondary-folders using a hard-coded primary-folder id for the parent
location.

Note that the `gpapi.get` is _awaitable_ which simplifies the code as it removes the need to for call-backs or explicit promise handling.

### _api/src/service/gp/processor.js_

```javascript
import { gpapi, makeProcessor } from '@gp-technical/stack-redux-api'

const processor = async action => {
  var { types, type, data } = action

  switch (type) {
    case types.gpGetDocuments:
      return await gpapi.get(`folder/${data}/items/simple`)
  }
}

export default makeProcessor(processor)
```

The processor listens for the `gpGetDocuments` actions dispatched when a folder is selected. It uses the `gpapi` helper object to fetch the list of GP content documents using the action's data payload
(its the `selectedFolderId`). The action return is _awaited_ to remove the need for complex call-backs.

## The `app` Component

### _app/src/component/gp/index.jsx_

```javascript
import React from 'react'
import { connect } from 'react-redux'
import Divider from 'material-ui/Divider'
import MenuItem from 'material-ui/MenuItem'
import SelectField from 'material-ui/SelectField'
import { actionHub, services, components } from '../../loader'

class component extends React.PureComponent {
  state = {
    selectedFolderId: null
  }
  getMenuItems = list => {
    if (list) {
      return list.map(i => <MenuItem value={i.Id} key={i.Id} primaryText={i.Name} />)
    }
    return <MenuItem value={null} primaryText="" />
  }

  onFolderSelected = (e, i, folderId) => {
    this.setState({ selectedFolderId: folderId })
    this.props.getDocuments(folderId)
  }

  onFileSelected = (file, row) => {
    const message = `In a real system, the file '${file.name}' would have been uploaded to the document '${row.name}'`
    window.alert(message)
  }

  columns = {
    name: 'name',
    type: 'content type',
    created: {
      format: ({ created }) => created.replace(' 00:00:00', '')
    },
    upload: {
      label: 'custom action',
      custom: row => <components.FileUpload label="select" row={row} onFileSelected={this.onFileSelected} />
    }
  }

  render() {
    const { folders, documents } = this.props
    const { selectedFolderId } = this.state
    return (
      <components.Box>
        <h2>
          Feature: <i>gp</i>
        </h2>
        // REACT Markup ...
        <SelectField floatingLabelText="Select a Folder" value={selectedFolderId} onChange={this.onFolderSelected}>
          {this.getMenuItems(folders)}
        </SelectField>
        <components.Table rows={documents} columns={this.columns} />
      </components.Box>
    )
  }
}

const mapStateToProps = state => ({
  folders: services.gp.selector.getFolders(state),
  documents: services.gp.selector.getDocuments(state)
})

const mapDispatchToProps = dispatch => ({
  getDocuments: folderId => dispatch(actionHub.GP_GET_DOCUMENTS(folderId))
})

export default connect(mapStateToProps, mapDispatchToProps)(component)
```

The app component exposes the REDUX state through the `mapStateToProps` using the feature's `selector`. It also dispatches the feature's `GP_GET_DOCUMENTS` action via the `mapDispatchToProps`
function.

The `selectedFolderId` value is stored on local REACT state which is set when the `onFolderSelected` function is called whenever the user selects a new folder from the dropdown. This function also
dispatches the `GP_GET_DOCUMENTS` action via the `getDocuments` function.

The `components.Table` is a shared component supplied by the `stack-redux-app` package. The columns of this table are defined using a plain `js` object called `columns`. You can see here that the
table component supports custom column contents and the custom formatting of column values.

## Example API Environment file

The `api` component of a stack application requires a set of environment values to be supplied via the `./api/.env` file. The file is _not_ included in the github repository as it contains sensitive
details. Each time you create a new stack application you must re-create the `.env` file and update its values as required.

Below is a complete example of a `.env` file with the sensitive data obscured.

```
# GENERAL
APP_ROOT=https://localhost:3000
API_NAME=stack-demo
API_PORT=3001
API_ROOT=https://localhost:3001
API_LOGENTRIES_TOKEN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx

# BRANDING
BRANDING_APP_NAME=Stack Demo
BRANDING_APP_IMAGE=/assets/branding/demo.png
BRANDING_LOADER_COLOR_BACKGROUND=##d3d3d3
BRANDING_LOADER_COLOR_TEXT=##000000

# HTTPS NODE SERVER
# Set to 0 to allow for self-signed TLS certificates during development
NODE_TLS_REJECT_UNAUTHORIZED=0


# Self-signed certs for development
# To generate a private key and public cert with no passphrase for TLS use:
# > openssl req -x509 -newkey rsa:4096 -keyout key.pem -out cert.pem -days 3650 -nodes

TLS_CERT=MIIE7TC...+gozUoKc=
TLS_KEY=MIIJRAIB...DBq1R


# AMAZON AWS
AWS_ACCESS_KEY_ID=xxxxxxxxxxxxxxxxxxxx
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxx
AWS_ROOT_BUCKET=goodpractice


# SSO
SSO_COOKIE_SECRET=95tuX...entropy...LWebas
SSO_IDP_URL=https://accounts.google.com/o/saml2/idp?idpid=C03qui8l3
SSO_SP_ENTITYID=manage-star-local
SSO_SP_PRIVATE_KEY=MIIJRA...0Pmf2


# GP-API
GP_API_URL=http://localhost:8082
GP_API_PUBLIC=xxxxxxxxxxxxxxxxxxxxxxxx
GP_API_SECRET=xxxxxxxxxxxxxxxxxxxxxxxx
GP_API_ADMIN=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
```
