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
import DesktopContainer from './DesktopContainer.js';
import MobileContainer from './MobileContainer.js';

const ResponsiveContainer = ({ children }) => (
  <div>
    <DesktopContainer>{ children }</DesktopContainer>
    <MobileContainer>{ children }</MobileContainer>
  </div>
)

ResponsiveContainer.propTypes = {
  children: PropTypes.node,
}

export default ResponsiveContainer;
