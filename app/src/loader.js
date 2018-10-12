import { makeActionHub, sharedServices, sharedHelper } from '@gp-technical/stack-pack-app'
import { featureServices, featureComponents } from '@gp-technical/stack-feature-app'
import localComponents from './component'
import localServices from './service'
import env from './env'

// Want everything other than Assets
const { Assets, Components, ...otherComponents } = featureComponents

const services = { ...localServices, ...featureServices, ...sharedServices }

const actionHub = makeActionHub(services)

const components = {
  ...localComponents,
  ...Components,
  ...otherComponents
}
const helper = { ...sharedHelper }

export { actionHub, env, components, services, helper }
