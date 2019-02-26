import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  Button,
  Container,
  Grid,
  Menu,
  Responsive,
  Segment,
  Visibility,
  Modal,
  Form,
  Checkbox,
  Transition
} from 'semantic-ui-react'

import * as actions from '../../store/actions/index.js';

class DesktopContainer extends Component {
  state = {
    email: '',
    password: '',
    modalForm: {
      status: false,
      action: ''
    }
  };

  hideFixedMenu = () => this.setState({ fixed: false })
  showFixedMenu = () => this.setState({ fixed: true })

  handleEmailInputChange(event) {
    const email = event.target.value;

    this.setState({ email });
  }

  handlePasswordInputChange(event) {
    const password = event.target.value;

    this.setState({ password });
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;
    const credentials = { email, password };

    switch(this.state.modalForm) {
      case 'Login':
        this.props.onPressSignUpButton({ credentials });
        this.setState({
          modalForm: { status: false }
        });
        break;
      case 'Signup':
        this.props.onPressSignUpButton({ credentials });
        this.setState({
          modalForm: { status: false }
        });
        break;

      default:
        break;
    }

    this.props.onPressSignUpButton({ credentials });
    this.setState({
      modalForm: { status: false }
    });
  }

  onButtonSignUpClicked() {
    this.setState({
      modalForm: {
        status: true,
        action: 'Signup'
      }
    });
  }

  onButtonLogInClicked() {
    this.setState({
      modalForm: {
        status: true,
        action: 'Login'
      }
    });
  }

  onCloseIconClicked() {
    this.setState({
      modalForm: { status: false }
    })
  }

  render() {
    const { children } = this.props
    const { fixed } = this.state

    return (
      <Responsive {...Responsive.onlyComputer}>
        <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
          <Segment inverted style={{ minHeight: '100px', background: '#fff' }} vertical>
            <Menu
              fixed={fixed ? 'top' : null}
              inverted
              pointing={!fixed}
              secondary={!fixed}
              size='large'
              style={{ background: '#0f5866' }}>
              <Container style={{ width: '100%', margin: '20px' }}>
                <Menu.Item position='left'>
                  <Button.Group>
                    <Link href='/'>
                      <Button as='a' style={{ marginLeft: '5px', marginRight: '5px'}}>
                        Home
                      </Button>
                    </Link>
                    <Link href='/about'>
                      <Button as='a' style={{ marginLeft: '5px', marginRight: '5px'}}>
                        About
                      </Button>
                    </Link>
                    </Button.Group>
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button.Group>
                    <Button
                      as='a'
                      style={{ marginLeft: '5px', marginRight: '5px'}}
                      onClick={this.onButtonLogInClicked.bind(this)}>
                      Login
                    </Button>
                    <Button
                      as='a'
                      style={{ marginLeft: '2px', marginRight: '2px'}}
                      positive
                      onClick={this.onButtonSignUpClicked.bind(this)}>
                      Sign Up
                    </Button>
                  </Button.Group>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
          <Transition visible={this.state.modalForm.status} animation='scale' duration={500}>
            <Modal
              closeIcon
              onClose={this.onCloseIconClicked.bind(this)}
              open={this.state.modalForm.status}
            >
              <Modal.Content>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                  <Grid.Column style={{ maxWidth: '500px' }}>
                    <Form size='large'>
                      <Segment>
                        <Form.Input
                          fluid
                          icon='user'
                          iconPosition='left'
                          placeholder='Email'
                          value={this.state.email}
                          onChange={this.handleEmailInputChange.bind(this)}
                        />
                        <Form.Input
                          fluid
                          icon='lock'
                          iconPosition='left'
                          placeholder='Password'
                          type='password'
                          value={this.state.password}
                          onChange={this.handlePasswordInputChange.bind(this)}
                        />
                        <Form.Field align='left'>
                          <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button
                          color='teal'
                          fluid
                          size='large'
                          type='submit' onClick={this.handleSubmit.bind(this)}
                        >
                          {this.state.modalForm.action}
                        </Button>
                      </Segment>
                    </Form>
                  </Grid.Column>
                </Grid>
              </Modal.Content>
            </Modal>
          </Transition>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressSignUpButton: (data) => dispatch(actions.userSignUp(data))
  };
};

export default connect(null, mapDispatchToProps)(DesktopContainer);

