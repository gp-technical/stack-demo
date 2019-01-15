import { message } from '@gp-technical/stack-pack-api'

const initialiser = async (profile, app, bootstrap) => {
  message.info('Initial data from message')
  return 'Initial data from the API'
}

export default initialiser
