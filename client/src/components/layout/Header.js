import React, { useState } from 'react'
import { useMediaQuery } from 'react-responsive'

import { AppBar, Box } from '@mui/material'
import HeaderLogo from './HeaderLogo'
import HeaderMenu from '../menu/HeaderMenu'
import IconButton from '../button/IconButton'
import DropdownMenu from '../menu/DropdownMenu'

export default function Header() {
  const isSmallScreen = useMediaQuery({ query: '(max-width: 480px)' })
  const [showMenu, setShowMenu] = useState()

  const toggleShowMenu = () => {
    setShowMenu(!showMenu)
  }

  return (
    <AppBar
      sx={{
        boxShadow: '0px 2px 22px 5px rgba(255,191,209,0.31);',
        backgroundColor: 'rgb(255,255,240)',
        position: 'unset',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignSelf: 'flex-start',
          }}
        >
          <HeaderLogo />
        </Box>
        {isSmallScreen ? (
          <Box
            sx={{
              display: 'flex',
              marginRight: 3,
            }}
          >
            <IconButton type="menu" onClick={toggleShowMenu} />
          </Box>
        ) : (
          <HeaderMenu />
        )}
      </Box>
      {showMenu && (
        <Box
          sx={{
            borderTop: '1px dashed rgba(255, 191, 209, 0.41)',
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <DropdownMenu />
        </Box>
      )}
    </AppBar>
  )
}
