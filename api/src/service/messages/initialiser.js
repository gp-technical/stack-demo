import { message } from '@gp-technical/stack-pack-api'

const initialiser = async (profile, app, bootstrap) => {
  message.info({ message: { text: 'Initial data from message' } }, app)
  return { result: { text: 'Initial data from the API' } }
}

export default initialiser
