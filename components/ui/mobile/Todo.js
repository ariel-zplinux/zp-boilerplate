import React from 'react';
import { Checkbox, Message, Input } from 'semantic-ui-react';

class Todo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      content: props.content || "",
      checked: false
    }
  }

  render() {
    return (
      <Message icon>
        <Checkbox style={todoStyle.checkbox} onChange={() => this.setState({checked: !this.state.checked})}/>
        <Message.Content style={todoStyle.content}>
          <Input
            defaultValue={this.props.content}
            disabled={this.state.checked}
          ></Input>
        </Message.Content>
      </Message>
    )
  }
}

const todoStyle = {
  content: {
    marginRight: "10px",
    marginLeft: "10px",
  }
}

export default Todo;
