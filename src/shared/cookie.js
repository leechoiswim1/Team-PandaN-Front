/**
 * setCookie
 * @param {string} name : cookie name
 * @param {*} value 		: cookie value
 * @param {*} exp 			: 만료시간 지정
 */
const setCookie = (name, value, exp = 1) => {
	let date = new Date();
	date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; expires=${date.toUTCString()}`;
};
/**
 * deleteCookie
 * @param {string} name : cookie name
 */
const deleteCookie = (name) => {
	let date = new Date("2020-01-01").toUTCString();
	document.cookie = name + "=; expires=" + date;
};

export { setCookie, deleteCookie };