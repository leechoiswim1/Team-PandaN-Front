/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from "react";
import { userActions } from '../modules/user';
import { useDispatch } from "react-redux";

export default (SpecialComponent, boolean) => {
	const AuthenticateCheck = (props) => {
		const dispatch = useDispatch();

		// const userInfo = localStorage.getItem("userInfo");
		const token = document.cookie.split("=")[1];

		// const isLoggedIn = userInfo !== null && token !== undefined ? true : false;
		const isLoggedIn = token !== undefined ? true : false;

		useEffect(() => {
			dispatch(userActions.__setLogin());
			if (!isLoggedIn && boolean) {
				props.history.push("/login");
			} 
			// else if (isLoggedIn && !boolean) {
			// 	props.history.push("/");
			// }
		}, []);

		return <SpecialComponent {...props} />;
	};

	return AuthenticateCheck;
};
