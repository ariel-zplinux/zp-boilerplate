

import React from 'react'
import { Input } from 'semantic-ui-react'

const TodoInput = (props) => (
  <div style={todoInputStyle}>
    <Input
      icon='plus'
      iconPosition='left'
      placeholder='Add Todo'
      action={{
        color: 'teal',
        icon: 'share',
      }}
    />
  </div>
)

const todoInputStyle = {
  marginLeft: "15px"
}

export default TodoInput
