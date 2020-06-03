import { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../components/ui/Layout.js';
import ResponsiveContainer from '../components/ui/ResponsiveContainer.js';
import TodoList from '../components/ui/mobile/TodoList.js';
import TodoInput from '../components/ui/mobile/TodoInput.js';
import StateManager from '../components/state/StateManager.js';

class Todos extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Layout>
        <ResponsiveContainer>
          <div className="zp">
            <TodoInput />
            <TodoList />
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
  return {};
};

export default StateManager(connect(mapStateToProps)(Todos));