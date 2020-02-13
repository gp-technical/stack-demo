const uuid = require('uuid/v4')

const initialiser = async user => {
  return { user, uuid: uuid() }
}

export default initialiser
