import {
  makeActionHub,
  sharedServices,
  // sharedComponents,
  sharedHelper
} from '@gp-technical/stack-pack-app'
import { featureServices, featureComponents } from '@gp-technical/stack-feature-app'
// import { Box, FileUpload, Table } from '@gp-technical/stack-pack-components'
import localComponents from './component'
import localServices from './service'
import env from './env'

const { Assets, Components, ...otherComponents } = featureComponents
const services = { ...localServices, ...featureServices, ...sharedServices }
const actionHub = makeActionHub(services)

const components = {
  ...localComponents,
  // ...sharedComponents,
  ...Assets,
  ...Components,
  ...otherComponents
  // ...{ Box, FileUpload, Table }
}
const helper = { ...sharedHelper }

export { actionHub, env, components, services, helper }
