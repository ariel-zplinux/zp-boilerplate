import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link';
import {
  Button,
  Checkbox,
  Form,
  Grid,
  Icon,
  Menu,
  Message,
  Modal,
  Responsive,
  Segment,
  Sidebar,
  Transition,
} from 'semantic-ui-react'

import * as actions from '../../store/actions/index.js';

class MobileContainer extends Component {
  state = {
    fixed: 'top',
    visible: false,
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

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });

  hideFixedMenu = () => this.setState({ fixed: null });
  showFixedMenu = () => this.setState({ fixed: 'top' });

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

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
    const { children } = this.props;
    const { sidebarOpened, fixed, visible } = this.state;

    return (
      <Responsive {...Responsive.onlyMobile}>

        <Menu fixed={fixed} style={{ background: '#0f5866', padding: '5px 0' }}>
          <Menu.Item onClick={this.toggleVisibility}>
            <Icon name='sidebar' />
          </Menu.Item>
          <Menu.Item position='right'>
            <Button.Group>
              {this.renderButtonLogin()}
              {this.renderButtonSignup()}
              {this.renderButtonLogout()}
            </Button.Group>
          </Menu.Item>
        </Menu>
        <Sidebar.Pushable as={Segment} style={{ marginTop: '70px' }}>
          <Sidebar as={Menu} fixed='left' animation='uncover' width='thin' visible={visible} icon='labeled' vertical inverted>
            <Link href='/'>
              <Menu.Item name='home'>
                <Icon name='home' />
                Home
                            </Menu.Item>
            </Link>
            <Link href='/about'>
              <Menu.Item name='about'>
                <Icon name='github' />
                About
                        </Menu.Item>
            </Link>
          </Sidebar>
          <Sidebar.Pusher dimmed={visible}>
            <Segment basic>
              <div style={mobileChildrenStyle}>
                {children}
              </div>

            </Segment>
          </Sidebar.Pusher>
        </Sidebar.Pushable>
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

      </Responsive>
    )
  }
}

MobileContainer.propTypes = {
  children: PropTypes.node,
}

const mobileChildrenStyle = {
  marginTop: '50px'
}

// export default MobileContainer;
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

export default connect(mapStateToProps, mapDispatchToProps)(MobileContainer);

