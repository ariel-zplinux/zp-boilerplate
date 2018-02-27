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
                            inverted
                            pointing={!fixed}
                            secondary={!fixed}
                            size='large'
                            style={{ background: '#0f5866' }}>
                            <Container style={{ width: '100%', margin: '20px' }}>
                                <Link href='/'><Menu.Item as='a'>Home</Menu.Item></Link>
                                <Link href='/about'><Menu.Item as='a'>About</Menu.Item></Link>
                                <Menu.Item position='right'>
                                    <Button as='a' >Log in</Button>
                                    <Button as='a' primary style={{ marginLeft: '0.5em' }}>Sign Up</Button>
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
    state = {
        fixed: 'top',
        visible: false
    }

    handleToggle = () => this.setState({ sidebarOpened: !this.state.sidebarOpened })

    hideFixedMenu = () => {
        console.log('=== onBottomPassedReverse')
   
        this.setState({fixed: null})
    }
    showFixedMenu = () => {
        console.log('=== onBottomPassed')

        this.setState({fixed: 'top'})

    }

    toggleVisibility = () => this.setState({ visible: !this.state.visible })

    render() {
        const { children } = this.props
        const { sidebarOpened, fixed, visible } = this.state

        return (
            <Responsive {...Responsive.onlyMobile}>

                <Menu fixed={fixed}  style={{background: '#0f5866', padding: '5px 0'}}>
                    <Menu.Item onClick={this.toggleVisibility}>
                        <Icon name='sidebar'/>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Button as='a' >Log in</Button>
                        <Button as='a' primary style={{ marginLeft: '0.5em' }}>Sign Up</Button>
                    </Menu.Item>
                </Menu>
                {/* <Button onClick={this.toggleVisibility}>Toggle Visibility</Button> */}
                <Sidebar.Pushable as={Segment} style={{marginTop: '70px'}}>
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
                    <Sidebar.Pusher  dimmed={visible}>
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
