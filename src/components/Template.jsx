import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

import { Container, Row, Col, Button, Alert, Breadcrumb, Card, Form } from 'react-bootstrap';
import '../styles/fonts/notosanskr/notosanskr.css';
import '../styles/scss/pandan.scss';
 
const Template = ({ history }) => {
	return (
		<React.Fragment>
      <Header />
      <Sidebar />
			<Button variant="danger">버튼</Button>
		</React.Fragment>
	)
};

export default Template;