import { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../components/ui/Layout.js';
import ResponsiveContainer from '../components/ui/ResponsiveContainer.js';
import TodoList from '../components/ui/mobile/TodoList.js';
import TodoInput from '../components/ui/mobile/TodoInput.js';
import StateManager from '../components/state/StateManager.js';

import * as actions from '../store/actions/index.js';

class Todos extends Component {
  constructor(props) {
    super(props);
  }

  componentDidUpdate(prevProps, prevState) {
    // after todo created
    console.log("===PASS componentDidUpdated")
    if (prevProps.step === "INITIAL" && this.props.step === "TODO_CREATED") {
      console.log("===PASS todo created componentDidUpdated")
      this.props.onLoadTodoList();
    }

  }

  render() {
    return (
      <Layout>
        <ResponsiveContainer>
          <div className="zp">
            <TodoInput create={this.props.onTodoCreate}/>
            <TodoList
              load={this.props.onLoadTodoList} // USELESS?
              todos={this.props.todos}
            />
          </div>
          <style jsx global>{`
            div.zp {
                margin-left: 10px;
                margin-right: 10px;
                position: relative;
            }
        `}
          </style>
        </ResponsiveContainer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log({state})
  return {
    step: state.page.step,
    todos: state.page.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTodoCreate: (data) => dispatch(actions.todoCreate(data)),
    onLoadTodoList: (data) => dispatch(actions.todoListLoad(data))
  };
};

export default StateManager(connect(mapStateToProps, mapDispatchToProps)(Todos));
