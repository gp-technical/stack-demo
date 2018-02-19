const messages = []

const createId = ({ firstname }, app) => {
  return firstname
  // return `${firstname}-${app}`
}

const add = (user, app, message) => {
  const newMessage = { id: createId(user, app), message }
  messages.push(newMessage)
  return newMessage
}

const get = () => {
  return messages
}

export { add, createId, get }
