import React, { useState } from 'react'

import classes from './IconButton.module.css'

import { IoEllipsisVerticalSharp } from 'react-icons/io5'
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
import { ImQuotesLeft } from 'react-icons/im'
import { HiOutlineBookOpen } from 'react-icons/hi'
import {
  BsDashCircle,
  BsCheckCircle,
  BsPlusCircle,
  BsXCircle,
} from 'react-icons/bs'

import InfoBubble from '../UI/InfoBubble'
import { Box } from '@mui/material'

export default function IconButton({
  type = 'like',
  size = '1.4',
  m = '.05',
  p = '.3',
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
    borderRadius: '50%',
    fontSize: `${size}em`,
    margin: `${m}em`,
    position: 'inherit',
    right: 'auto',
    border: 'none',
    backgroundColor: 'none',
    minWidth: 'unset',
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
      icon = <BsPlusCircle />
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
      icon = <BsDashCircle />
      break

    case 'save':
      icon = <BsCheckCircle />
      break

    case 'exit':
      icon = <BsXCircle />
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
