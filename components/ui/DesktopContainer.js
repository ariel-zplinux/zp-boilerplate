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
                <Link href='/'><Menu.Item as='a'>Home</Menu.Item></Link>
                <Link href='/about'><Menu.Item as='a'>About</Menu.Item></Link>
                <Menu.Item position='right'>
                  <Button as='a' >Login</Button>
                  <Button as='a' primary onClick={this.onButtonSignUpClicked.bind(this)} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
          <Transition visible={this.state.modalForm} animation='scale' duration={800}>
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

