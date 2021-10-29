import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import style from './Markdown.module.css'

export default function Markdown({ text, small }) {
  const styles = `${style.markdown} ${small ? style.small : ''}`
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={styles}>
      {text}
    </ReactMarkdown>
  )
}
