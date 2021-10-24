import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import style from './Markdown.module.css'

export default function Markdown({ text }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} className={style.markdown}>
      {text}
    </ReactMarkdown>
  )
}
