import React from 'react'
import { ListItem } from '@material-ui/core'

export const UserCard = ({ children, selected }) => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '300px',
      height: '43px',
      background: selected ? '#9b59b6' : '#2980b9',
      borderRadius: '10px',
      marginBottom: '10px'
    }}
  >
    {children}
  </div>
)

export const UserCardAsListItem = ({ children, selected, ...props }) => (
  <ListItem
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      width: '310px',
      height: '43px',
      background: selected ? '#9b59b6' : '#2980b9',
      borderRadius: '10px',
      marginBottom: '10px'
    }}
    {...props}
  >
    {children}
  </ListItem>
)

export const SharedWIthContainer = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      width: '50%',
      margin: '0 20px'
    }}
  >
    {children}
  </div>
)

export const SharedWithArea = ({ children }) => (
  <div
    style={{
      display: 'flex',
      flexFlow: 'column wrap',
      width: '100%',
      height: '121px',
      overflowX: 'auto'
    }}
  >
    {children}
  </div>
)
