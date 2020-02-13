const reducer = (state = {}, action) => {
  const { type, types, data } = action

  switch (type) {

    case types.testando_init:
      {
        if (!document.cookie.includes('myToken'))
        {
          const token = data
          document.cookie = `myToken=${token}`
          console.log(document.cookie)
          
          return { ...state, data }
        }
        else
        {
          const getCookie = name => 
          {
            const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
            return v ? v[2] : null
          }

          console.log('TOKEN:', getCookie('myToken'))
          return { ...state, data: getCookie('myToken') }
        }
      }

    case types.testandoFromLocal:
      return { ...state, data, source: 'FRONT' }

    case types.testandoFromApiResponse:
      return { ...state, data, source: 'BACK' }

    default:
      return state
  }
}

export default reducer
