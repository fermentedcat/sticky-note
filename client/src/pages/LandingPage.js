import React from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div>
      <h1>Welcome to todo app</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  )
}
