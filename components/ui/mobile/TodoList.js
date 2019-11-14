import React from 'react';
import { List } from 'semantic-ui-react';
import Todo from './Todo.js';

class TodoList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [
        {content: "todo1"},
        {content: "todo2"},
        {content: "todo3"},
        {content: "todo4"},
        {content: "todo5"},
        {content: "todo6"},
        {content: "todo7"}
      ]
    }
  }

  renderTodos() {
    const { todos } = this.state;

    const todosItems = todos.map((todo, i) => {
      return (
        <List.Item key={i}>
          <Todo content={todo.content} />
        </List.Item>
      );
    });

    return todosItems;
  }

  render() {
    return (
      <List>
        {this.renderTodos()}
      </List>
    )
  }
}

const todoListStyle = {
  content: {
    marginRight: "10px",
    marginLeft: "10px",
  }
}

export default TodoList;
