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

class MobileContainer extends Component {
  state = {
    fixed: 'top',
    visible: false
  };

  handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened });

  hideFixedMenu = () => this.setState({ fixed: null });
  showFixedMenu = () => this.setState({ fixed: 'top' });

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

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

export default MobileContainer;
