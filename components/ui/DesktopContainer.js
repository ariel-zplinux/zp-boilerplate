import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  Button,
  Container,
  Icon,
  Menu,
  Responsive,
  Segment,
  Sidebar,
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
    modalForm: false
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

    this.props.onPressSignUpButton({ credentials });
    this.setState({
      modalForm: false
    });
  }

  onButtonSignUpClicked() {
    this.setState({
      modalForm: true
    });
  }

  onCloseIconClicked() {
    this.setState({
      modalForm: false
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
                    <Button as='a' style={{ marginLeft: '5px', marginRight: '5px'}}>
                      <Link href='/'>
                        Home
                      </Link>
                    </Button>
                    <Button as='a' style={{ marginLeft: '5px', marginRight: '5px'}}>
                      <Link href='/about'>
                        About
                      </Link>
                    </Button>
                    </Button.Group>
                </Menu.Item>
                <Menu.Item position='right'>
                  <Button.Group>
                    <Button
                      as='a'
                      style={{ marginLeft: '5px', marginRight: '5px'}}
                      onClick={this.onButtonSignUpClicked.bind(this)}>
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
          <Transition visible={this.state.modalForm} animation='scale' duration={500}>
            <Modal
              closeIcon
              onClose={this.onCloseIconClicked.bind(this)}
              open={this.state.modalForm}
            >
              <Modal.Header>Sign up</Modal.Header>
              <Modal.Content>
                <Form>
                  <Form.Field>
                    <label>Email</label>
                    <input placeholder='Email' value={this.state.email} onChange={this.handleEmailInputChange.bind(this)} />
                  </Form.Field>
                  <Form.Field>
                    <label>Password</label>
                    <input placeholder='Password' type="password" value={this.state.password} onChange={this.handlePasswordInputChange.bind(this)} />
                  </Form.Field>
                  <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                  </Form.Field>
                  <Button type='submit' onClick={this.handleSubmit.bind(this)}>Submit</Button>
                </Form>
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

