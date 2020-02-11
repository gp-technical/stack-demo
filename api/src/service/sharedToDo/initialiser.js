const initialiser = async (user, socketId) => {
  console.log(user, socketId)
  return { user, socketId }
}

export default initialiser
