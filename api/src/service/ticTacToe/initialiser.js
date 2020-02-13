const initialiser = async (user, socketId) => {
  if (!user) return
  return { user, socketId }
}

export default initialiser
