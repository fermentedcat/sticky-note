import React, { useState } from 'react'

import classes from './IconButton.module.css'

import { IoEllipsisVerticalSharp, IoExitOutline } from 'react-icons/io5'
import { AiOutlineInfoCircle } from 'react-icons/ai'
import { FiSettings, FiEdit } from 'react-icons/fi'
import { CgFormatSlash } from 'react-icons/cg'
import { VscSmiley } from 'react-icons/vsc'
import {
  RiLock2Fill,
  RiDeleteBin6Line,
  RiPushpinLine,
  RiPushpinFill,
} from 'react-icons/ri'
import { ImQuotesLeft, ImCancelCircle } from 'react-icons/im'
import { HiOutlineBookOpen } from 'react-icons/hi'
import { BsPatchPlus } from 'react-icons/bs'

import InfoBubble from '../UI/InfoBubble'
import { Box } from '@mui/material'

export default function IconButton({
  type = 'like',
  size = '1.4',
  m = '.05',
  p = '.3',
  fixed,
  circle = true,
  active,
  description,
  last,
  bottomDescr,
  onClick = () => {},
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}) {
  const [showDescription, setShowDescription] = useState(false)

  const wrapperClasses = `${classes.icon} ${active ? classes.active : ''}`

  const styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: `${p}em`,
    height: 'fit-content',
    borderRadius: circle ? '50%' : '3px',
    fontSize: `${size}em`,
    margin: fixed ? '0.2em' : `${m}em`,
    position: fixed ? 'absolute' : 'inherit',
    right: fixed ? 19 : 'auto',
    border: fixed ? '3px solid rgba(255,191,209,0.64)' : 'none',
    backgroundColor: fixed ? 'rgb(255,255,240)' : 'none',
  }

  const handleShowDescription = () => {
    setShowDescription(true)
  }

  const handleHideDescription = () => {
    setShowDescription(false)
  }

  const buttonProps = {
    onClick: () => {
      setShowDescription(false)
      onClick()
    },
    onMouseEnter,
    onMouseLeave,
  }

  if (description) {
    buttonProps.onMouseEnter = handleShowDescription
    buttonProps.onMouseOver = handleShowDescription
    buttonProps.onMouseLeave = handleHideDescription
  }

  let icon

  switch (type) {
    case 'actions':
      icon = <IoEllipsisVerticalSharp />
      break

    case 'settings':
      icon = <FiSettings />
      break

    case 'info':
      icon = <AiOutlineInfoCircle />
      break

    case 'fwdslash':
      icon = <CgFormatSlash />
      break

    case 'lock':
      icon = <RiLock2Fill />
      break

    case 'quote':
      icon = <ImQuotesLeft />
      break

    case 'read':
      icon = <HiOutlineBookOpen />
      break

    case 'add':
      icon = <BsPatchPlus />
      break

    case 'edit':
      icon = <FiEdit />
      break

    case 'delete':
      icon = <RiDeleteBin6Line />
      break

    case 'pin':
      icon = <RiPushpinLine />
      break

    case 'unpin':
      icon = <RiPushpinFill className={classes.pinned} />
      break

    case 'cancel':
      icon = <ImCancelCircle />
      break

    case 'exit':
      icon = <IoExitOutline />
      break

    default:
      icon = <VscSmiley />
      break
  }

  return (
    <Box {...buttonProps} className={wrapperClasses} sx={styles}>
      {showDescription && (
        <InfoBubble text={description} last={last} bottom={bottomDescr} />
      )}
      {icon}
    </Box>
  )
}
