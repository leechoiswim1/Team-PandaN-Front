/* setCookie
 * @param {string} name : cookie name
 * @param {*} value     : cookie value
 * exp       : 만료시간 지정(현재 기본값 6시간)
 */
const setCookie = (name, value) => {
  let date = new Date();
  date.setTime(date.getTime() + 6 * 60 * 60 * 1000);
  document.cookie = name + "=" + value + "; expires=" + date + "; path=/";
};

/**
 * deleteCookie
 * @param {string} name : cookie name
 */
const deleteCookie = (name) => {
	let date = new Date("2020-01-01");
	document.cookie = name + "=; expires=" + date + "; path=/";
};

export { setCookie, deleteCookie };
