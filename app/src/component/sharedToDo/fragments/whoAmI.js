import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { services } from '../../../loader'

const WhoAmI = () => {
  const { selector } = services.sharedToDo
  const ownerId = useSelector(state => selector.getOwnerId(state))

  return (
    <div>
      <h3>Who am i?</h3>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '400px',
          height: '43px',
          background: '#2980b9',
          borderRadius: '10px',
          marginBottom: '10px'
        }}
      >
        <Typography style={{ color: 'white' }}>{ownerId}</Typography>
      </div>
    </div>
  )
}

export default WhoAmI
