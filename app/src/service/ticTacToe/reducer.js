const getCookie = name => 
{
  const v = document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)')
  return v ? v[2] : null
}


const reducer = (state = {}, action) => {
    const { type, types, data } = action
  
    switch (type) {
  
      case types.testando_init:
      {
        if (!document.cookie.includes('user'))
        {
          const user = data.user
          document.cookie = `user=${user}`    
          const XO = data.XO 
          document.cookie = `XO=${XO}`    
               
          return { ...state, user: getCookie('user'), XO: getCookie('XO') }
        }
        else
        {
          return { ...state, user: getCookie('user'), XO: getCookie('XO') }
        }
      }
  
      case types.ticTacToeFromApiResponse:
        return { ...state, data }
  
      default:
        return state
    }
  }
  
  export default reducer
  