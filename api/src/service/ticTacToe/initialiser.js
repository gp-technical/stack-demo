const XO = 'X'

const initialiser = async () => {
  const user = 'user' + Math.floor(Math.random() * Math.floor(100))

  const data =
  {
    user,
    XO
  }
  return data
}

export default initialiser
