import React from 'react'

import TodoForm from '../form/TodoForm'
import StackForm from '../form/StackForm'

export const ModalContent = ({ modal, onClose, ...restOfProps }) => {
  switch (modal.type) {
    case 'add_todo': {
      return <TodoForm {...restOfProps} onClose={onClose} closeForm={onClose} />
    }
    case 'add_stack': {
      return <StackForm closeForm={onClose} />
    }
    case 'edit_stack': {
      return <StackForm edit closeForm={onClose} />
    }
    default:
      return <p>no content</p>
  }
}
