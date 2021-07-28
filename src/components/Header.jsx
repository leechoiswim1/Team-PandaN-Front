import React from 'react';
import Modals from './Modals';
const Header = ({ history }) => {
	return (
		<React.Fragment>
			<div style={{fontSize: '2.0rem'}}>Header</div>
			<Modals buttonTitle="멤버초대" Title="멤버초대" Content="
		코드받기로넣어줄코드~" Close="
		Close"/>
		</React.Fragment>
	)
};

export default Header;