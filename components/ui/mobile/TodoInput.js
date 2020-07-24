import { Component } from 'react';
import { Input, Form } from 'semantic-ui-react'

class TodoInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ''
    }
  }

  handleChange(event, { name, value }) {
    this.setState({ [name]: value })
  }

  handleSubmit() {
    const { content } = this.state

    this.props.create({content});
  }

  render() {
    const { content } = this.state;
    return (
      <div style={todoInputStyle}>
        <Form
          onSubmit={this.handleSubmit.bind(this)}
        >
          <Input
            icon='plus'
            iconPosition='left'
            placeholder='Add Todo'
            name='content'
            value={content}
            action={{
              color: 'teal',
              icon: 'share',
            }}
            onChange={this.handleChange.bind(this)}
          />
        </Form>
      </div>
    );
  }
}

const todoInputStyle = {
  marginLeft: "15px"
}

export default TodoInput
