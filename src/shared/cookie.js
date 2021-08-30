/* setCookie
 * @param {string} name : cookie name
 * @param {*} value     : cookie value
 * exp                  : 만료시간 지정(현재 기본값 5시간 30분)
 */
const setCookie = (name, value) => {
  let date = new Date();
  date.setTime(date.getTime() + (5.5 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + "; expires=" + date.toUTCString + "; path=/";
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
