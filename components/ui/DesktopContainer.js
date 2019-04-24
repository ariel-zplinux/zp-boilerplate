import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  Button,
  Checkbox,
  Container,
  Form,
  Grid,
  Icon,
  Menu,
  Message,
  Modal,
  Responsive,
  Segment,
  Transition,
  Visibility
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

  componentDidUpdate(prevProps) {
    // user was not connected and succeed to connect => close auth modal
    if (!prevProps.user && this.props.user && this.state.modalForm.status) {
      // close modal
      this.setState({
        modalForm: {
          status: false,
          action: ''
        }
      });
    }
  }

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

    switch(this.state.modalForm.action) {
      case 'Login':
        this.props.onPressLogInSubmitButton({ credentials });
        break;
      case 'Signup':
        this.props.onPressSignUpSubmitButton({ credentials });
        break;
      default:
        break;
    }
  }

  onButtonSignUpClicked() {
    // clean error/user in auth application state
    this.props.onPressMenuAuthButton();

    this.setState({
      modalForm: {
        status: true,
        action: 'Signup'
      }
    });
  }

  onButtonLogInClicked() {
    // clean error/user in auth application state
    this.props.onPressMenuAuthButton();

    this.setState({
      modalForm: {
        status: true,
        action: 'Login'
      }
    });
  }

  onButtonLogOutClicked() {
    this.props.onPressLogOutButton(this.props.user);
  }

  onCloseIconClicked() {
    this.setState({
      modalForm: { status: false }
    })
  }

  renderButtonLogin() {
    // display Login button if user not connected
    if (!this.props.user || this.props.user === 'WAIT-FOR-EMAIL-VERIFICATION') {
      return (
        <Button
          as='a'
          style={{ marginLeft: '5px', marginRight: '5px'}}
          onClick={this.onButtonLogInClicked.bind(this)}>
          Login
        </Button>
      );
    }
  }

  renderButtonSignup() {
    // display Signup button if user not connected
    if (!this.props.user || this.props.user === 'WAIT-FOR-EMAIL-VERIFICATION') {
      return (
        <Button
          as='a'
          style={{ marginLeft: '2px', marginRight: '2px'}}
          positive
          onClick={this.onButtonSignUpClicked.bind(this)}>
          Sign Up
        </Button>
      );
    }
  }

  renderButtonLogout() {
    // display Logout button if user connected
    if (!!this.props.user && this.props.user !== 'WAIT-FOR-EMAIL-VERIFICATION') {
      return  (
        <Button
          as='a'
          style={{ marginLeft: '2px', marginRight: '2px'}}
          color='teal'
          onClick={this.onButtonLogOutClicked.bind(this)}
        >
          Log out
        </Button>
      );
    }
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
                    {this.renderButtonLogin()}
                    {this.renderButtonSignup()}
                    {this.renderButtonLogout()}
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
              style={{ width: '500px'}}
              size='fullscreen'
            >
              <Modal.Content>
                <Grid textAlign='center' style={{ height: '100%', backgroundColor: '#F8F8F9'  }} verticalAlign='middle'>
                  <Grid.Column style={{ maxWidth: '500px' }}>
                    <Form size='large' error={!!this.props.error}>
                      <Segment>
                        <Message error>
                          <Icon name="warning sign" />
                          {this.props.error}
                        </Message>
                        <Form.Input
                          fluid
                          icon='user'
                          iconPosition='left'
                          placeholder='Username'
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

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
    error: state.auth.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onPressSignUpSubmitButton: (data) => dispatch(actions.userSignUp(data)),
    onPressLogInSubmitButton: (data) => dispatch(actions.userLogIn(data)),
    onPressMenuAuthButton: () => dispatch(actions.userInit()),
    onPressLogOutButton: (data) => dispatch(actions.userLogOut(data))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DesktopContainer);

