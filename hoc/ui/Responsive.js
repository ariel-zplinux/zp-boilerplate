import PropTypes from 'prop-types';
import React, { Component } from 'react';
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
  Checkbox
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

    this.setState({email});
  }

  handlePasswordInputChange(event) {
    const password = event.target.value;

    this.setState({password});
  }

  handleSubmit(event) {
    event.preventDefault();

    const { email, password } = this.state;

    const credentials = { email, password};

    this.props.onPressSignUpButton({credentials});
  }

  onButtonSignUpClicked() {
    this.setState({
      modalForm: true
    })
  }

  componentWillUpdate(props) {
    // To hide modal if user submitted correct data
    if (!props.modalFormAuth && this.state.modalForm) {
      this.setState({modalForm: false})
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
                <Link href='/'><Menu.Item as='a'>Home</Menu.Item></Link>
                <Link href='/about'><Menu.Item as='a'>About</Menu.Item></Link>
                <Menu.Item position='right'>
                  <Button as='a' >Login</Button>
                  <Button as='a' primary onClick={this.onButtonSignUpClicked.bind(this)} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                  <Modal
                    open={this.state.modalForm}
                  >
                    <Modal.Header>Sign up</Modal.Header>
                    <Modal.Content>
                      <Form>
                        <Form.Field>
                          <label>Email</label>
                          <input placeholder='Email' value={this.state.email} onChange={this.handleEmailInputChange.bind(this)}/>
                        </Form.Field>
                        <Form.Field>
                          <label>Password</label>
                          <input placeholder='Password' type="password" value={this.state.password} onChange={this.handlePasswordInputChange.bind(this)}  />
                        </Form.Field>
                        <Form.Field>
                          <Checkbox label='I agree to the Terms and Conditions' />
                        </Form.Field>
                        <Button type='submit' onClick={this.handleSubmit.bind(this)}>Submit</Button>
                      </Form>
                    </Modal.Content>
                  </Modal>


                </Menu.Item>
              </Container>
            </Menu>
          </Segment>
        </Visibility>

        {children}
      </Responsive>
    )
  }
}

DesktopContainer.propTypes = {
  children: PropTypes.node,
}

const modal = (
  <form class="ui form">
    <div class="field">
      <label>First Name</label>
      <input placeholder="First Name" />
    </div>
    <div class="field">
      <label>Last Name</label>
      <input placeholder="Last Name" />
    </div>
    <div class="field">
      <div class="ui checkbox">
        <input type="checkbox" class="hidden" readonly="" tabindex="0" />
        <label>I agree to the Terms and Conditions</label>
      </div>
    </div>
    <button type="submit" class="ui button">Submit</button>
  </form>
)

class MobileContainer extends Component {
  state = {
    fixed: 'top',
    visible: false
  }

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

  hideFixedMenu = () => {
    console.log('=== onBottomPassedReverse')

    this.setState({ fixed: null })
  }
  showFixedMenu = () => {
    console.log('=== onBottomPassed')

    this.setState({ fixed: 'top' })

  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render() {
    const { children } = this.props
    const { sidebarOpened, fixed, visible } = this.state

    return (
      <Responsive {...Responsive.onlyMobile}>

        <Menu fixed={fixed} style={{ background: '#0f5866', padding: '5px 0' }}>
          <Menu.Item onClick={this.toggleVisibility}>
            <Icon name='sidebar' />
          </Menu.Item>
          <Menu.Item position='right'>
            <Button as='a' >Log in</Button>
            <Button as='a' primary style={{ marginLeft: '0.5em' }}>Sign Up</Button>
          </Menu.Item>
        </Menu>
        {/* <Button onClick={this.toggleVisibility}>Toggle Visibility</Button> */}
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

const ResponsiveContainer = ({ children, onPressSignUpButton, modalFormAuth }) => (
  <div>
    <DesktopContainer
      onPressSignUpButton={onPressSignUpButton}
      modalFormAuth={modalFormAuth}
    >
      {children}</DesktopContainer>
    <MobileContainer>{children}</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer;
