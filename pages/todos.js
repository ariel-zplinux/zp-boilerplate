import { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Divider } from 'semantic-ui-react';

import Layout from '../components/ui/Layout.js';
import ResponsiveContainer from '../components/ui/ResponsiveContainer.js';
import Status from '../components/ui/Status.js';
import Todo from '../components/ui/mobile/Todo.js'
import StateManager from '../components/state/StateManager.js';

class Todos extends Component {
  constructor(props) {
    super(props);

    this.state = {
      messageFromWebSocket: null,
      data: null,
      from: null
    }
  }

  // React lifecycle

  // Functions

  // Render

  render() {
    // const { loading, statusTitle, statusContent } = Todos.prepareStatus(this.state, this.props);

    return (
      <Layout>
        <ResponsiveContainer>
          <div className="zp">
              <Todo content="CONTENT1" />
              <Todo content="CONTENT2" />
              <Todo content="CONTENT2" />
              <Todo content="CONTENT1" />
              <Todo content="CONTENT2" />
              <Todo content="CONTENT2" />
              <Todo content="CONTENT1" />
              <Todo content="CONTENT2" />
              <Todo content="CONTENT2" />
            {/* </p> */}
          </div>
          <style jsx global>{`
            div.zp {
                padding: 10px;
            }
        `}
          </style>
        </ResponsiveContainer>
      </Layout>
    );
  }
}

const mapStateToProps = (state) => {
  const from = state.auth.from || state.page.from;

  return {
    from,
    user: state.auth.user,
    redux: true
  };
};

export default StateManager(connect(mapStateToProps)(Todos));
