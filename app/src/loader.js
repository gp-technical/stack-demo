import { makeActionHub, sharedServices, sharedHelper } from '@gp-technical/stack-pack-app'
import { featureServices, featureComponents } from '@gp-technical/stack-feature-app'
import localComponents from './component'
import localServices from './service'

// Want everything other than assets
const { assets, uiComponents, ...otherComponents } = featureComponents

const components = {
  ...localComponents,
  ...uiComponents,
  ...otherComponents
}

const services = { ...localServices, ...featureServices, ...sharedServices }

const actionHub = makeActionHub(services)

const helper = { ...sharedHelper }

export { actionHub, components, services, helper }
