import { List, ListItem } from '@mui/material';
import React, { Children } from 'react'
import classes from './ActionsMenu.module.css'

export default function ActionsMenu({
  children, 
  onMouseLeave,
  invisible,
  bottomDescr = false
}) {
  const childrenArray = Children.toArray(children);

  let listClasses = `${classes.menu}`

  if (invisible) {
    listClasses += ` ${classes.invisible}`;
  }

  // add last = true if last child element (for description display)
  const childrenWithProps = Children.map(childrenArray, (child, index) => {
    if (React.isValidElement(child)) {
      let last = false
      if (childrenArray.length === index + 1) {
        last = true
      }
      return React.cloneElement(child, {last, bottomDescr})
    }
    return child;
  })

  const list = childrenWithProps.map((child, index) => {
    return (
      <ListItem key={index} className={classes.menuItem} /* action */>
        {child}
      </ListItem>
    )
  })

  return (
    <List 
      className={listClasses}
      onMouseLeave={onMouseLeave} 
      sx={{ padding: 0}}
      >
      {list}
    </List>

  )
}
