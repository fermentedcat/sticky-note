import React from 'react'

import { Button } from '@mui/material'

export default function SubmitButton({ title, disabled = false }) {
  return (
    <Button
      type="submit"
      disabled={disabled}
      sx={{
        display: 'block',
        mx: 'auto',
      }}
    >
      {title}
    </Button>
  )
}
