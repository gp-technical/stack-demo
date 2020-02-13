import { makeProcessor } from '@gp-technical/stack-pack-api'

const initState = 
{
  general: 
  [ 
    { from: 'aaron', msg: 'hello' },
    { from: 'arnold', msg: 'hello' },
    { from: 'archer', msg: 'hello' },
  ],
  topic2: 
  [ 
    { from: 'zapdos', msg: 'hello' },
    { from: 'moltres', msg: 'hello' },
    { from: 'articuno', msg: 'hello' },
  ],
}



const processor = async (action, state=initState) => {
  var { types, type } = action

  switch (type) {
    case types.ticTacToeFromApi:
      return {...state}
  }
}

export default makeProcessor(processor)
