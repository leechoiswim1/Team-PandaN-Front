/* setCookie
 * @param {string} name : cookie name
 * @param {*} value     : cookie value
 * @param {*} exp       : 만료시간 지정(시간 단위, 1 = 1시간, 현재 기본값 6시간)
 */
const setCookie = (name, value, exp = 6) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 60 * 60 * 1000);
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
};

/**
 * deleteCookie
 * @param {string} name : cookie name
 */
const deleteCookie = (name) => {
	let date = new Date("2020-01-01");
	document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
};

export { setCookie, deleteCookie };
