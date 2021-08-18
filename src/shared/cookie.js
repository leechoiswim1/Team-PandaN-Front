/* setCookie
 * @param {string} name : cookie name
 * @param {*} value     : cookie value
 * @param {*} exp       : 만료시간 지정(일 단위, 1 = 1일, 현재 기본값 1일이며 배포 시 수정 예정)
 */
const setCookie = (name, value, exp = 1) => {
  let date = new Date();
  date.setTime(date.getTime() + exp * 24 * 60 * 60 * 1000);
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
