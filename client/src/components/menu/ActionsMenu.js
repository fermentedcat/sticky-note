import { List, ListItem } from '@mui/material'
import React, { Children } from 'react'
import classes from './ActionsMenu.module.css'

export default function ActionsMenu({ children, onMouseLeave }) {
  const childrenArray = Children.toArray(children)

  const list = childrenArray.map((child, index) => {
    return (
      <ListItem key={index} className={classes.menuItem}>
        {child}
      </ListItem>
    )
  })

  return (
    <List
      className={classes.menu}
      onMouseLeave={onMouseLeave}
      sx={{ padding: 0 }}
    >
      {list}
    </List>
  )
}
