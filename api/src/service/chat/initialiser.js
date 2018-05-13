import { get } from './db'

const initialiser = async user => {
  return user && { messages: get() }
}

export default initialiser
