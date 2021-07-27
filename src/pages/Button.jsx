import React from 'react';

const Button = ({children, ...rest}) => {
	return (
		<React.Fragment>
			<button>{children}</button>
		</React.Fragment>
	)
};

export default Button;