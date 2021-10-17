import React from 'react'

import { Button } from '@mui/material'

export default function SubmitButton({title}) {
  return (
    <Button
      type="submit"
      sx={{
        display: 'block',
        mx: 'auto',
      }}
    >
      {title}
    </Button>
  )
}