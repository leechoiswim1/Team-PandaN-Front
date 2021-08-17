/**
 * logger(message)
 * @param {*} message : 출력할 내용
 * @returns 
 */
export const logger = ( message ) => {	
	if (process.env.NODE_ENV === "production") {
	return;
	}
	console.log( message );
};
