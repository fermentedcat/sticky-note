import React from 'react'

import Card from '../card/Card'
import TodoForm from '../form/TodoForm'
import StackForm from '../form/StackForm'

export const ModalContent = ({ modal, onClose, ...restOfProps }) => {
  switch (modal.type) {
    case 'add_todo': {
      return (
        <Card title="Add todo">
          <TodoForm {...restOfProps} closeForm={onClose} />
        </Card>
      )
    }
    case 'add_stack': {
      return <StackForm closeForm={onClose} />
    }
    case 'edit_todo': {
      return (
        <Card title="Edit todo">
          <TodoForm {...restOfProps} />
        </Card>
      )
    }
    case 'edit_stack': {
      return <StackForm edit closeForm={onClose} />
    }
    default:
      return <p>no content</p>
  }
}
