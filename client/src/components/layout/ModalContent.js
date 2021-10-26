import React from 'react'
import StackForm from '../form/StackForm'

import TodoForm from '../form/TodoForm'

export const ModalContent = ({ modal, onClose, ...restOfProps }) => {
  switch (modal.type) {
    case 'add_todo': {
      return <TodoForm {...restOfProps} closeForm={onClose} />
    }
    case 'add_stack': {
      return <StackForm closeForm={onClose} />
    }
    default:
      return <p>no content</p>
  }
}
