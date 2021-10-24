import React from 'react'
import classes from './InfoBubble.module.css'

export default function InfoBubble({ text, bottom }) {
  let bubbleClasses = classes.bubble

  if (bottom) {
    bubbleClasses += ` ${classes.bottom}`
  }

  return (
    <div className={bubbleClasses}>
      <div className={classes.textBox}>
        <p>{text}</p>
      </div>
      <div className={classes.triangle}></div>
    </div>
  )
}
