import React from 'react'
import { Typography } from '@material-ui/core'
import { useSelector } from 'react-redux'
import { services } from '../../../loader'
import { UserCard } from './styles'

const WhoAmI = () => {
  const { selector } = services.sharedToDo
  const ownerId = useSelector(state => selector.getOwnerId(state))

  return (
    <div>
      <h3>Who am i?</h3>
      <UserCard>
        <Typography style={{ color: 'white' }}>{ownerId}</Typography>
      </UserCard>
    </div>
  )
}

export default WhoAmI
