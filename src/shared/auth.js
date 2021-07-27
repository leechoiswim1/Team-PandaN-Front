/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default (SpecialComponent, option) => {
	const AuthenticateCheck = (props) => {		
		return <SpecialComponent {...props} />;
	};

	return AuthenticateCheck;
};
