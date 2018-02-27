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
} from 'semantic-ui-react'

class DesktopContainer extends Component {
    state = {}

    hideFixedMenu = () => this.setState({fixed: false})
    showFixedMenu = () => this.setState({fixed: true})

    render() {
        const {children} = this.props
        const {fixed} = this.state

        return (
            <Responsive {...Responsive.onlyComputer}>
                <Visibility once={false} onBottomPassed={this.showFixedMenu} onBottomPassedReverse={this.hideFixedMenu}>
                    <Segment inverted style={{ minHeight: '100px', background: '#fff' }} vertical>
                        <Menu
                            fixed={fixed ? 'top' : null}
                            inverted={!fixed}
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                            style={{ background: '#0f5866' }}>
                            <Container style={{ width: '100%', margin: '20px' }}>
                                <Link href='/'><Menu.Item as='a'>Home</Menu.Item></Link>
                                <Link href='/about'><Menu.Item as='a'>About</Menu.Item></Link>
                                <Menu.Item position='right'>
                                    <Button as='a' inverted={!fixed}>Log in</Button>
                                    <Button as='a' inverted={!fixed} primary={fixed} style={{ marginLeft: '0.5em' }}>Sign Up</Button>
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

class MobileContainer extends Component {
    state = {}

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    render() {
        const { children } = this.props
        const { sidebarOpened } = this.state

        return (
            <Responsive {...Responsive.onlyMobile}>
                <Sidebar.Pushable>
                    <Sidebar as={Menu} animation='uncover' inverted vertical visible={sidebarOpened} width='thin'>
                        <Link href='/'><Menu.Item as='a'>Home</Menu.Item></Link>
                        <Link href='/about'><Menu.Item as='a'>About</Menu.Item></Link>
                    </Sidebar>

                    <Sidebar.Pusher dimmed={sidebarOpened} style={{ minHeight: '100vh' }}>
                        <Segment inverted textAlign='center' style={{ minHeight: 100,  background: '#fff', padding: '1em 0em' }} vertical>
                            <Container style={{background: '#0f5866'}}>
                                <Menu inverted pointing secondary size='large'>
                                    <Menu.Item onClick={this.handleToggle}>
                                        <Icon name='sidebar'/>
                                    </Menu.Item>
                                    <Menu.Item position='right'>
                                        <Button as='a' inverted>Log in</Button>
                                        <Button as='a' inverted style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                                    </Menu.Item>
                                </Menu>
                            </Container>
                        </Segment>

                        {children}
                    </Sidebar.Pusher>
                </Sidebar.Pushable>
            </Responsive>
        )
    }
}

MobileContainer.propTypes = {
    children: PropTypes.node,
}

const ResponsiveContainer = ({ children }) => (
    <div>
        <DesktopContainer>{children}</DesktopContainer>
        <MobileContainer>{children}</MobileContainer>
    </div>
)

ResponsiveContainer.propTypes = {
    children: PropTypes.node,
}

export default ResponsiveContainer;
