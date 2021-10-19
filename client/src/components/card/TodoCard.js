import React, { useState } from 'react'

import { Card, Grid, Button, CardHeader, CardContent, Typography } from '@mui/material'
import IconButton from '../button/IconButton'
import ActionsMenu from '../menu/ActionsMenu'

export default function TodoCard({ todo }) {
  const [showModal, setShowModal] = useState(false)
  const handleOpenTodo = () => { console.log(todo.description)}
  const handleOpenEditTodo = () => { console.log(todo.description)}
  const handlePin = () => { console.log(todo.description)}


  return (
    <Grid key={todo._id} item xs={2} sm={4} md={4} lg={4} sx={{ height: 250 }}>
      <Card
        sx={{
          overflow: 'unset',
          border: '1px dotted #ffbfd1',
          boxShadow: '0px 7px 12px -4px rgba(50,30,10,0.15)',
          height: '100%',
          display: "flex",
          flexDirection: "column",
          backgroundColor: "rgb(255,255,249)",
          justifyContent: "space-between"
        }}
      >
        <CardHeader
          action={
            <ActionsMenu invisible>
              <IconButton type="pin" active description="pin" onClick={handlePin}/>
              <IconButton
                type="edit"
                active
                description="edit"
                onClick={handleOpenEditTodo}
              />
            </ActionsMenu>
          }
          sx={{
            height: 'fit-content',
            padding: 1.1,
            paddingRight: 1.6,
            color: '#ffbfd1',
            borderBottom: '1px dotted #ffbfd1',
          }}
        ></CardHeader>
        
        <CardContent
          component={Button}
          onClick={handleOpenTodo.bind(this, todo._id)}
          sx={{ width: '100%', height: '100%', boxShadow: 'none', flexDirection: 'column', justifyContent: 'flex-start', textTransform: 'none'}}
        >
          <Typography variant="body1" color="text.primary" sx={{ textAlign: 'left', alignSelf: 'start'}}>
            {todo.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'left', alignSelf: 'start'}}>
            {todo.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}
