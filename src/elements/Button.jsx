import React from 'react';

// children: children, ...rest: 나머지 props
// 추후 props 명시할 필요 있을 경우 수정
const Button = ({children, ...rest}) => {
	return (
		<React.Fragment>
			<button>{children}</button>
		</React.Fragment>
	)
};

export default Button;