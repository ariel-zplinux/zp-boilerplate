import React from 'react';
import { Checkbox, Message, Input, Icon } from 'semantic-ui-react';

const Todo = (props) => (
  <Message icon>
    <Checkbox style={todoStyle.checkbox}/>
    <Message.Content style={todoStyle.content}>
      <Input defaultValue={props.content}></Input>
    </Message.Content>
  </Message>
);

const todoStyle = {
  checkbox: {
    // marginRight: "20px",
  },
  content: {
    marginRight: "10px",
    marginLeft: "10px",

    textDecorationLine: "line-through"
  }
}

export default Todo;