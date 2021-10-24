import React from 'react'
import { useSelector } from 'react-redux'

export default function HomePage() {
  const username = useSelector((state) => state.user.username)

  return <div>Welcome home, {username}! Here are your pinned todos.</div>
}
