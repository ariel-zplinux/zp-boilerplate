import React, { Component } from 'react';
import {
  Button,
  Modal,
  Segment,
  Transition,
} from 'semantic-ui-react'
import { connect } from 'react-redux';

import Status from '../ui/Status.js';
import * as actions from '../../store/actions/index.js';

class Hubside extends Component {
  state = {
    hubside: {
      status: false,
      title: '',
    }
  };

  render() {
    return (
      <div>
        <Button
          type='submit' onClick={this.resolveClient.bind(this)}
        >
          Resolve objects (in browser)
        </Button>

        <Button
          type='submit' onClick={this.resolveServer.bind(this)}
          style={{
            paddingTop: '10px'
          }}
        >
          Resolve objects (in server)
        </Button>

        <Transition visible={this.state.hubside.status} animation='scale' duration={500}>
          <Modal
            closeIcon
            onClose={this.onCloseIconClicked.bind(this)}
            open={this.state.hubside.status}
            style={{ width: '500px' }}
            size='fullscreen'
          >
            <Modal.Content>
              <Segment>
                <Status
                  title={this.state.hubside.title}
                />

                OUTPUT
                <pre>{JSON.stringify(this.props.output, null, 2)}</pre>
              </Segment>
            </Modal.Content>
          </Modal>
        </Transition>
      </div>
    );
  }

  resolveClient(event) {
    event.preventDefault();
    this.props.onPressResolveClientButton()
    this.setState({
      hubside: {
        status: true,
        title: 'RESOLVED FROM CLIENT'
      }
    });
  }

  resolveServer(event) {
    event.preventDefault();
    this.props.onPressResolveServerButton()
    this.setState({
      hubside: {
        status: true,
        title: 'RESOLVED FROM SERVER',
      }
    });
  }

  onCloseIconClicked() {
    this.setState({
      hubside: {
        status: false,
        title: ''
      }
    })
  }
}

const mapStateToProps = (state) => {
  return {
    output: state.hubside.output
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressResolveClientButton: () => dispatch(actions.resolveClient()),
    onPressResolveServer: () => dispatch(actions.resolveServer()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Hubside);
