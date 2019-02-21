import { Component } from 'react';
import io from 'socket.io-client';
import { Divider } from 'semantic-ui-react';

import Layout from '../components/ui/Layout.js';
import ResponsiveContainer from '../hoc/ui/ResponsiveContainer.js';
import Status from '../components/ui/Status.js';

class Index extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: null
    }
  }

  // Next lifecycle

  static getInitialProps(context) {
    return Promise.resolve({ appName: 'Zp Boilerplate' });
  }

  // React lifecycle

  componentDidMount() {
    this.socket = io();

    this.socket.on('now', (data) => {
      this.setState({
        status: data.message
      })
    });
  }

  // Functions

  static prepareStatus(state) {
    if (state.status) {
      return {
        loading: false,
        statusTitle: 'LOADED FROM WEBSOCKET',
        statusContent: state.status
      };
    }
    return {
      loading: true,
      statusTitle: 'LOADING FROM WEBSOCKET',
      statusContent: 'We are fetching that content for you.'
    };
  }

  // Render

  render() {
    const { loading, statusTitle, statusContent } = Index.prepareStatus(this.state);

    return (
      <Layout>
        <ResponsiveContainer>
          <div className="zp">
            <Status loading={loading} title={statusTitle} content={statusContent} />

            <Divider
              as='h4'
              className='header'
              horizontal
              style={{ margin: '3em 0em', textTransform: 'uppercase' }}>
              Welcome to {this.props.appName}
            </Divider>

            <p className="zp"> The purpose of this boilerplate is to start new projects using a React stack.</p>
          </div>
          <style jsx global>{`
                        p.zp {
                            text-align: left;
                        }

                        div.zp {
                            padding: 15px;
                        }
                    `}
          </style>
        </ResponsiveContainer>
      </Layout>
    );
  }
}

export default Index;
