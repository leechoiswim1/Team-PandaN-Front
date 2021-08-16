/* eslint-disable import/no-anonymous-default-export */
import React, { useEffect } from "react";
/* == Redux - actions */
import { useDispatch } from "react-redux";
import { userActions } 	from '../modules/user';

/**src/component/Router.js
 * Page 			: 해당 라우트에서 보여줄 페이지
 * checkAuth 	: 해당 라우트 AuthCheck 여부 (boolean) 
 * return			: 해당 페이지와 react-router props(history, match, location)
 */
export default (Page, checkAuth) => {
	const AuthCheck = (props) => {
		const dispatch = useDispatch();
		// prettier 설정으로 인해 쌍따옴표로 감쌀 수 없어 ` ` 사용합니다.
		const token = document.cookie.split(`"`)[3];
		const useremail = localStorage.getItem("useremail");
		const isLoggedIn = useremail !== null && token !== undefined ? true : false;

		useEffect(() => {
			dispatch(userActions.__setLogin());
			if (!isLoggedIn && checkAuth) {
				props.history.push("/login");
			} 
			else if (isLoggedIn && !checkAuth) {
				props.history.push("/");
			}
		}, []);

		return <Page {...props} />;
	};
	return AuthCheck;
};
