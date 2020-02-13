const initialiser = async () => {
  const token = 'user' + Math.floor(Math.random() * Math.floor(100))
  console.log('TOKEN', token)
  return token
}

export default initialiser
