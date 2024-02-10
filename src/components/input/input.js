import styled from 'styled-components';
import React from 'react';

const InputContainer = React.forwardRef(({ className, width, ...props }, ref) => {
	return <input className={className} ref={ref} {...props} />;
});

export const Input = styled(InputContainer)`
	width: ${({ width = '100%' }) => width};
	height: 40px;
	margin: 0 0 10px;
	padding: 10px;
	border: 1px solid black;
	font-size: 18px;
`;
