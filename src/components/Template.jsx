import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';

const Template = ({ history }) => {
	return (
		<React.Fragment>
      <Header />
      <Sidebar />
		</React.Fragment>
	)
};

export default Template;