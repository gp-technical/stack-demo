const messages = []

const createUser = ({ firstname }) => {
  return firstname
}

const add = (user, message) => {
  const newMessage = { user: createUser(user), message }
  messages.push(newMessage)
  return newMessage
}

const get = () => {
  return messages
}

export { add, get }
