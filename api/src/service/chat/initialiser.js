import { get } from './db'

const initialiser = async user => ({ messages: get() })

export default initialiser
